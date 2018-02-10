/*
 * @Author: lip.fan
 * @Date: 2018-02-10 11:35:29
 * @Last Modified by: lip.fan
 * @Last Modified time: 2018-02-10 12:29:55
 */
export default function walk(el, action, done) {
  const nodes = el.childNodes && [].slice.call(el.childNodes)

  done = done || function() {}
  action = action || function() {}

  function next(skip) {
    if (skip || nodes.length === 0) return done()
    walk(nodes.shift(), action, next)
  }
  action(el, next)
}
