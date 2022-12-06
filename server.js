const express = require('express')
const Datastore = require('nedb')
require('dotenv').config()
const app = express()


app.listen(3000, function () {console.log('listening...')})
app.use(express.static('public'))
app.use(express.json())

database = new Datastore('database.db')
database.loadDatabase()

app.post('/address', (req, res) => {
    let data = req.body
    data.timestamp = Date.now()
    database.insert(data)
    res.json(data)
});

app.get('/address/:address', async (req, res) => {
    let address = req.params.address
    let blockfrost = `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`
    let response = await fetch(blockfrost, {
        headers: {
            'project_id': process.env.API_KEY
        }
    })
    let data = await response.json()
    res.json(data.stake_address)
})

app.get('/assets/:asset', async (req, res) => {
    let asset = req.params.asset
    let blockfrost = `https://cardano-mainnet.blockfrost.io/api/v0/assets/${asset}`
    let response = await fetch(blockfrost, {
        headers: {
            'project_id': process.env.API_KEY
        }
    })
    let data = await response.json()
    res.json(data.onchain_metadata)
})