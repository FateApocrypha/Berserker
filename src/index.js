import init from './init/index'
export default function Berserker(options) {
  if (!(this instanceof Berserker)) return new Berserker(options)

  this.options = options
  init(this)
}
