const express = require('express')
const path = require('path')
const app = express()

//definindo o template engine
app.set('view engine', 'ejs') //quando uso template engine, não preciso definir os arquivos estáticos

//MVC -MODEL VIEW CONTROLLER

// //Definindo os arquivos estáticos
// const staticFolder = path.join(__dirname, 'views') //caminho da pasta views
// const expressStatic = express.static(staticFolder) // passamos a pasta de arquivos estáticos
// app.use(expressStatic) 

//Definindo os arquivos públicos
const publicFolder = path.join(__dirname, 'public') //caminho da pasta views
const expressPublic = express.static(publicFolder) // passamos a pasta de arquivos estáticos
app.use(expressPublic) 

app.get('/', (request, response) => {
    response.render('index')
})

app.get('/about', (request, response) => {
    response.send("About")
})

//404 error (not found)
app.use((request, response) => {
    response.send('Page not found!')
})


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listen on port ${port}`)) //template string