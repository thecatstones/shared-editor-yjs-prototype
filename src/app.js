const Y = require('yjs')
require('y-memory')(Y)  // extend Y with the memory module
require('y-websockets-client')(Y)
require('y-array')(Y)
require('y-text')(Y)

Y({
  db: {
    name: 'memory',                // store the shared data in memory
  },
  connector: {
    name: 'websockets-client',     // use the websockets connector
    room: 'my room',               // instances connected to the same room share data
    url: 'https://catstones-websocket-server.herokuapp.com/',      // specify your own server destination
  },
  share: {                         // specify the shared content
    array: 'Array',                // y.share.array is of type Y.Array
    text:  'Text',                 // y.share.text is of type Y.Text
  },
}).then((y) => {                   // Yjs is successfully initialized
  window.y = y
  window.Y = Y  // for debugging
  console.log('Yjs instance ready!')

  // CodeMirror setup
  const code = document.getElementById('textfield')
  const editor = CodeMirror.fromTextArea(code, {
    mode:        'javascript',
    theme:       'seti',
    lineNumbers: true,
    tabSize:     2,
  })

  y.share.text.bindCodeMirror(editor)
})
