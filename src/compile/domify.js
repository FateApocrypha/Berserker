/*
 * @Author: lip.fan
 * @Date: 2018-02-10 11:56:50
 * @Last Modified by: lip.fan
 * @Last Modified time: 2018-02-10 11:56:50
 */

export default function domify(DOMString) {
  const html = document.implementation.createHTMLDocument()

  html.body.innerHTML = DOMString

  return html.body.childNodes
}
