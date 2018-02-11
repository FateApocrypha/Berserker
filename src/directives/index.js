import IF from './if'
import text from './text'
import show from './show'
import src from './src'
import href from './href'
import style from './style'

import { generate } from '../compile/generate'
let directives = {
  IF,
  text,
  show,
  src,
  href,
  style
}
export default class Directive {
  constructor(options = {}) {
    if (options.name === 'if') options.name = 'IF'

    Object.assign(this, options)
    Object.assign(this, directives[this.name])
    this.beforeUpdate && this.beforeUpdate()
    this.update && this.update(generate(this.expression)(this.compile.data))
  }
}
