import configure from '../configure'
import berserker from '../index'
export default {
  beforeUpdate() {
    this.placeholder = document.createComment(`${configure.identifier.bind}${this.name}`)
    this.node.parentNode.replaceChild(this.placeholder, this.node)

    this.itemName = 'item'
    this.indexName = 'index'
    this.dataName = this.expression

    if (this.expression.indexOf(' in ') !== -1) {
      const bracketRE = /\(((?:|\n)+?)\)/g
      const [item, data] = this.expression.split(' in ')
      let matched = null
      if ((matched = bracketRE.exec(item))) {
        const [item, index] = matched[1].split(',')
        index ? (this.indexName = index.trim()) : ''
        this.itemName = item.trim()
      } else {
        this.itemName = item.trim()
      }
      this.dataName = data.trim()
    }
    this.expression = this.dataName
  },
  update(data) {
    if (data && !Array.isArray(data)) return
    const fragment = document.createDocumentFragment()
    data.map((item, index) => {
      const ber = berserker({
        template: this.node.cloneNode(true),
        data: {
          [this.itemName]: item,
          [this.indexName]: index
        }
      })
      console.log(ber)
      fragment.appendChild(ber.options.template)
    })

    this.placeholder.parentNode.replaceChild(fragment, this.placeholder)
  }
}
