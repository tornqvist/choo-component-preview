var html = require('choo/html')

var Component = require('./component')

module.exports = function (state, emit, render) {
  return html`
    <body>
      ${render(Component, 'header')}
      <h1>Sup planet</h1>
      ${render(Component, 'footer')}
      <a href="/async">async</a>
    </body>
  `
}
