import initComputed from './computed'
import initCompile from './compiled'

export default function init(ber) {
  initCompile(ber)
  initComputed(ber)
}
