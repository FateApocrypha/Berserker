import domify from './domify.js'
import extend from '../commons/extend'
import defaults from './defaults'
import walk from './walk'
import Directive from '../directives/index'
import parse from './parse'
import { hasInterpolation } from '../commons/utils'
import configure from '../configure'

const TEXT_NODE = 3
const ELEMENT_NODE = 1

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
    if (node.nodeType === ELEMENT_NODE) {
      this.compile.elementNodes.call(this, node)
      return next()
    } else if (node.nodeType === TEXT_NODE) {
      this.compile.textNodes.call(this, node)
    }
    next()
  })
  this.view = template
  template = null
}

Compile.prototype.compile = {}
Compile.prototype.compile.elementNodes = function(node) {
  let attributes = [].slice.call(node.attributes)
  let attrName = '',
    attrValue = '',
    directiveName = ''
  // 节点上的属性可以分为普通属性，指令属性，普通属性中带有{{}}
  // 通过判断属性名中是不是包含有指令的特殊字符:
  attributes.map(attr => {
    attrName = attr.name
    attrValue = attr.value
    if (attrName.indexOf(configure.identifier.bind) === 0 && attrValue !== '') {
      //获取指令的名称
      directiveName = attrName.slice(1)

      this.bindDirective({
        node,
        name: directiveName,
        expression: attrValue
      })
      node.removeAttribute(attrName)
    } else {
      this.bindAttribute(node, attr)
    }
  })
}
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
/**
 * normal attribute
 * @param {*} node
 * @param {*} attribute
 */
Compile.prototype.bindAttribute = function(node, attribute) {
  if (!hasInterpolation(attribute.value) || attribute.value.trim() === '') return false
  this.bindDirective({
    node,
    name: 'attribute',
    expression: parse.text(attribute.value),
    attrName: attribute.name
  })
}
Compile.prototype.bindPriority = function() {}
