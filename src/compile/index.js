import domify from './domify'
import extend from '../commons/extend'
import defaults from './defaults'
import walk from './walk'

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
      console.log(node)
      // this.compile.elementNodes.call(this, node)
      return next()
    } else if (node.nodeType === 3) {
      console.log(node)
      // this.compile.textNodes.call(this, node)
    }
    next()
  })
}
