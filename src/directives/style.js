import { each, type } from '../commons/utils'
export default {
  update(style) {
    each(style, (item, i) => {
      if (type(item) === 'object') {
        each(item, (it, j) => (this.node.style[j] = it))
      } else {
        this.node.style[i] = item
      }
    })
  }
}
