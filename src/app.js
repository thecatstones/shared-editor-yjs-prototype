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
    // url: 'localhost:1234',      // specify your own server destination
  },
  share: {                         // specify the shared content
    array: 'Array',                // y.share.array is of type Y.Array
    text:  'Text',                 // y.share.text is of type Y.Text
  },
}).then((y) => {                   // Yjs is successfully initialized
  window.y = y
  console.log('Yjs instance ready!')
  y.share.array                    // is a Y.Array instance
  y.share.text                     // is a Y.Text instance
})
