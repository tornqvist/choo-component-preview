var choo = require('choo')

var app = choo()
app.use(require('../')())
app.use(store)
app.route('/', require('./view'))
app.route('/async', require('./async'))
app.mount('body')

function store (state, emitter) {
  emitter.on('fetch', function () {
    window.fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(function (body) {
        body.json().then(function (data) {
          state.data = data
          emitter.emit('render')
        })
      })
  })
}
