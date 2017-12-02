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

  // patch for nanocomponent which defaults to div as placeholder element
  _createProxy () {
    var proxy = document.createElement('body')
    var self = this
    this._brandNode(proxy)
    proxy.id = this._id
    proxy.setAttribute('data-proxy', '')
    proxy.isSameNode = function (el) {
      return (el && el.dataset.nanocomponent === self._ncID)
    }
    return proxy
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
