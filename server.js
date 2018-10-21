const express = require('express')
const path    = require('path')
const PORT    = process.env.PORT || 3000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.sendFile('public/index.html'))
  .listen(PORT, () => console.log(`Express server listening on port ${ PORT }`))
