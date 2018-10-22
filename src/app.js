const Y = require('yjs')
require('y-memory')(Y)  // extend Y with the memory module
require('y-websockets-client')(Y)
require('y-array')(Y)
require('y-text')(Y)

let url = window.location.href.includes('heroku') ? 'https://catstones-websocket-server.herokuapp.com/' : undefined

Y({
  db: {
    name: 'memory',                // store the shared data in memory
  },
  connector: {
    name: 'websockets-client',     // use the websockets connector
    room: 'my room',               // instances connected to the same room share data

    // TODO: stop Chrome from blocking connection to heroku server when running locally
    // comment out url to use Yjs-provided WebSocket server
    url,
  },
  share: {                         // specify the shared content
    array: 'Array',                // y.share.array is of type Y.Array
    text:  'Text',                 // y.share.text is of type Y.Text
    text2:  'Text',
    // text3:  'Text',
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

  // REPL
  const consoleElm  = document.querySelector('#console')
  const clearButton = document.querySelector('#clear')

  clearButton.addEventListener('click', (event) => {
    // consoleElm.innerHTML = ''
    y.share.array.delete(0, y.share.array.length)

    consoleForm.reset()
    y.share.text2.delete(0, y.share.text2.length)
  })

  const consoleForm = document.querySelector('#console-form')
  consoleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let command = event.target.querySelector('#command').value
    // consoleElm.innerHTML += `>> ${command}\n`
    y.share.array.push([`>> ${command}\n`])
    let value   = eval(command)
    // let output  = (value === undefined ? 'undefined' : value) + '\n'
    let output  = `${JSON.stringify(value)}\n`
    // consoleElm.innerHTML += output
    y.share.array.push([output])
    
    consoleForm.reset()
    y.share.text2.delete(0, y.share.text2.length)
    // term.write(output)
  })

  y.share.text2.bind(document.querySelector('#command'))
  // y.share.array.bind(consoleElm)
  y.share.array.observe(event => {
    if (event.type == 'insert') {
      event.values.forEach(value => {
        consoleElm.innerHTML += value
      })
    } else {
      consoleElm.innerHTML = ''
    }
  })
})

// REPL
// const Terminal  = require('xterm').Terminal
// window.Terminal = Terminal
// const term      = new Terminal()
// window.term     = term
// term.open(document.getElementById('terminal'))
// term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')


