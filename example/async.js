var Nanocomponent = require('nanocomponent')
var Component = require('./component')
var html = require('choo/html')

module.exports = class Async extends Nanocomponent {
  static identity () {
    return 'async-view'
  }

  constructor (name, state, emit) {
    super(name)
    if (this._hasWindow && !state.data) emit('fetch')
  }

  update () {
    return true
  }

  createElement (state, emit, render) {
    return html`
      <body>
        ${render(Component, 'header')}
        ${state.data ? html`
          <div>
            <h1>${state.data.title}</h1>
            <p>${state.data.body}</p>
          </div>
        ` : html`<h1>Loading…</h1>`}
        ${render(Component, 'footer')}
        <a href="/">home</a>
      </body>
    `
  }
}
