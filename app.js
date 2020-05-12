const express = require('express')
const app = express()
const port = 2022

// import route
const productsRouter = require('./src/routes/productRoutes')
const storeRouter = require('./src/routes/storeRoutes')
const uiRouter = require('./src/routes/uiRoutes')

app.use(express.json())
app.use(productsRouter)
app.use(storeRouter)
app.use(uiRouter)


app.get('/', (req, res) => {
    res.send({
        message : 'Akses berhasil'
    })
})

app.listen(port, () => console.log('API IS RUNNING AT ' + port))

