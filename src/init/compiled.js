import Compile from '../compile/index'
export default function initCompile(ber) {
  ber.$compile = Compile
  ber.view = ber.$compile(ber.options.template, {
    data: ber.options.data
  }).view
}
