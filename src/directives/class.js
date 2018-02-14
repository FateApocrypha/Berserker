/*
 * @Author: lip.fan
 * @Date: 2018-02-13 17:26:59
 * @Last Modified by: lip.fan
 * @Last Modified time: 2018-02-14 17:45:27
 */
import { each, type } from '../commons/utils'
import { addClass, removeClass } from '../commons/dom'
export default {
  update(klass) {
    each(klass, (item, i) => {
      if (type(item) === 'object') {
        each(item, (val, key) => (val ? addClass(this.node, key) : removeClass(this.node, key)))
      } else {
        let className = type(i) === 'number' ? item : i
        console.log(className)
        className ? addClass(this.node, className) : removeClass(this.node, className)
      }
    })
  }
}
