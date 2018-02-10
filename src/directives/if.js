import configure from '../configure'
export default {
  beforeUpdate() {
    this.placeholder = document.createComment(`${configure.identifier.bind}${this.name}`)
    console.log(this.placeholder)
    this.node.parentNode.replaceChild(this.placeholder, this.node)
    console.log(this.node)
  },
  update(show) {
    if (show) this.placeholder.parentNode.replaceChild(this.node, this.placeholder)
  }
}
