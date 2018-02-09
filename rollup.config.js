const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const sourcemaps = require('rollup-plugin-sourcemaps')

const packages = require('./package.json')
const paths = {
  root: '/',
  source: {
    root: './src/'
  },
  dist: {
    root: './dist/'
  }
}

let filename, configure

filename = process.env.NODE_ENV === 'development' ? packages.name : `${packages.name}.min`

configure = {
  input: `${paths.source.root}index.js`,
  output: {
    name: 'berserka',
    sourcemap: true,
    file: `${paths.dist.root}${filename}.js`,
    format: 'umd',
    banner: `
/*!
 * ${packages.name}.js v${packages.version}
 * (c) 2018 ${packages.author}
 * ${packages.repository.url.replace('.git', '')}
 * Released under the MIT License.
*/
    `
  },
  plugins: [babel(), sourcemaps()]
}
if (process.env.NODE_ENV === 'production') {
  configure.plugins.push(uglify())
} else {
  configure.output.file = `${paths.dist.root}${filename}.es.js`
  configure.output.format = 'es'
}
module.exports = configure
