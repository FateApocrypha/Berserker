import domify from './domify.js'
import extend from '../commons/extend'
import defaults from './defaults'
import walk from './walk'
import Directive from '../directives/index'
import parse from './parse'

export default function Compile(template, options = {}) {
  if (!(this instanceof Compile)) return new Compile(template, options)

  if (template instanceof Node) {
    options.template = template
  } else if (typeof template === 'string') {
    [template] = domify(template)
    options.template = template
  } else if (typeof template !== 'string') {
    options = template
  }
  this.options = extend(true, defaults, options)
  this.data = this.options.data
  template = this.options.template
  walk(template, (node, next) => {
    if (node.nodeType === 1) {
      // this.compile.elementNodes.call(this, node)
      return next()
    } else if (node.nodeType === 3) {
      this.compile.textNodes.call(this, node)
    }
    next()
  })
  this.view = template
  template = null
}

Compile.prototype.compile = {}
Compile.prototype.compile.textNodes = function(node) {
  if (node.textContent.trim() === '') return false
  this.bindDirective({
    node,
    name: 'text',
    expression: parse.text(node.textContent)
  })
}
Compile.prototype.bindDirective = function(options) {
  options.compile = this
  new Directive(options)
}
