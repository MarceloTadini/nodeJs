const { request, response } = require('express')
const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send("Hello World!")
})

app.get('/about', (request, response) => {
    response.send("About")
})

app.use((request, response) => {
    response.send('Page not found!')
})


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listen on port ${port}`)) //template string