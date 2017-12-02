var createCache = require('./lib/cache')
var assert = require('assert')

module.exports = store

function store () {
  return function (state, emitter, app) {
    var setRoute = app.route.bind(app)
    var cache = createCache(state, emitter.emit.bind(emitter))

    app.route = function (route, callback) {
      setRoute(route, function (state, emit) {
        if (typeof callback.identity === 'function') {
          return Render(callback, state, emit, Render)
        }
        return callback(state, emit, Render)
      })
    }

    function Render (Component) {
      assert.equal(typeof Component, 'function', 'choo-component-preview: Component should be type function')
      var args = []
      for (var i = 0, len = arguments.length; i < len; i++) {
        args.push(arguments[i])
      }
      return cache.render.apply(cache, args)
    }
  }
}
