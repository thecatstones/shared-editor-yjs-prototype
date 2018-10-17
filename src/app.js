const repo = () => `ipfs/yjs-demo/${Math.random()}`

const IPFS = require('ipfs')

const ipfs = new IPFS({
  repo: repo(),
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {      // overload the default config
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/',
      ],
    },
  },
})

ipfs.once('ready', () => ipfs.id((err, info) => {
  if (err) throw err
  console.log(`IPFS node ready with address ${info.id}`)
}))

const Y = require('yjs')
require('y-memory')(Y)
require('y-ipfs-connector')(Y)
require('y-array')(Y)
require('y-text')(Y)

Y({
  db: {
    name: 'memory',
  },
  connector: {
    name: 'ipfs',
    room: 'Textarea-example-dev',
    ipfs,
  },
  share: {
    textarea: 'Text',
  },
}).then((y) => {
  y.share.textarea.bind(document.getElementById('textfield'))
})
