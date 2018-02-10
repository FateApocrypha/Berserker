const tagRE = /\{\{((?:.|\n)+?)\}\}/g

export default {
  text(text) {
    // reference: https://github.com/vuejs/vue/blob/dev/src/compiler/parser/text-parser.js#L15-L41
    if (!tagRE.test(text)) return JSON.stringify(text)

    const tokens = []
    let lastIndex = (tagRE.lastIndex = 0)
    let index, matched
    while ((matched = tagRE.exec(text))) {
      // 第一次出现{{}}的位置
      index = matched.index
      // 解析出的存字符串文本
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      // 获取解析出的表达式
      tokens.push(matched[1].trim())
      // 上一次的位置
      lastIndex = index + matched[0].length
    }
    // 剩下的所有的 纯字符串
    if (lastIndex < text.length) tokens.push(JSON.stringify(text.slice(lastIndex)))
    return tokens.join('+')
  }
}
