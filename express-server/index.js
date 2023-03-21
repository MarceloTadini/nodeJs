const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

//definindo o template engine
app.set('view engine', 'ejs') //quando uso template engine, não preciso definir os arquivos estáticos

//MVC -MODEL VIEW CONTROLLER

// //Definindo os arquivos estáticos
// const staticFolder = path.join(__dirname, 'views') //caminho da pasta views
// const expressStatic = express.static(staticFolder) // passamos a pasta de arquivos estáticos
// app.use(expressStatic) 

//habilitar o servidor para receber os dados via post (formulário)
app.use(express.urlencoded({ extended: true}))

//Definindo os arquivos públicos
const publicFolder = path.join(__dirname, 'public') //caminho da pasta views
const expressPublic = express.static(publicFolder) // passamos a pasta de arquivos estáticos
app.use(expressPublic) 


//rotas
app.get('/', (request, response) => {
    response.render('index', {
        title: 'Digital Tech - Home'
    })
})

app.get('/quemsomos', (request, response) => {
    response.send("quemsomos")
})

app.get('/produtos', (request, response) => {
    response.send("produtos")

})

app.get('/servicos', (request, response) => {
    response.send("servicos")
})

app.get('/contato', (request, response) => {
    response.send("contato")
})


app.get('/posts', (request, response) => {
    response.render("posts", {
        title: 'Digital Tech - Posts',
        posts: [
            {
                title: 'Novidade no mundo tech!', 
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, sit impedit vero quos deserunt eius asperiores totam, corporis voluptas culpa eos illo quisquam alias. Recusandae totam optio odio numquam sapiente.',
                stars: 3
            },
            {
                title: 'Novas vagas aberta!', 
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, sit impedit vero quos deserunt eius asperiores totam, corporis voluptas culpa eos illo quisquam alias. Recusandae totam optio odio numquam sapiente.',
            
            },
            {
                title: 'Acidente em fábrica de celular!', 
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, sit impedit vero quos deserunt eius asperiores totam, corporis voluptas culpa eos illo quisquam alias. Recusandae totam optio odio numquam sapiente.',
                stars: 5
            },
        ]
    })
})

app.get('/cadastro-posts', (request, response) => {
    const {c} = request.query
    response.render('cadastro-posts', {
        title: 'Digital Tech - Cadastrar Post',
        cadastrado: c,
    })
})

app.post('/salvar-post', (request, response) => {
    const {titulo, texto} = request.body

    const data = fs.readFileSync('./store/posts.json')
    const posts = JSON.parse(data)

    posts.push({
        titulo,
        texto
    })

    const postsString = JSON.stringify(posts)

    fs.writeFileSync('./store/posts.json', postsString)

    response.redirect('/cadastro-posts?c=1')
})

//404 error (not found)
app.use((request, response) => {
    response.send('Page not found!')
})


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listen on port ${port}`)) //template string