import init from './init/index'
export default function Berserka(options) {
  if (!(this instanceof Berserka)) return new Berserka(options)

  this.options = options
  init(options)
}
