const fyleSystem = require('fs')

fyleSystem.readFile('./clientes.json', function(error, content){
    if(error) {
        console.log('erro!', error)
    }

    else{
       console.log(JSON.parse(content)) 
    }

})