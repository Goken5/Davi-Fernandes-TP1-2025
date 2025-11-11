const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Página Inicial');
})

app.get('/sobre', (req, res) => {
    res.send('Servidor Criado com Express');
})

app.get('/hora', (req, res) => {
    const date = new Date();
    const hora = date.getHours();
    const minuto = date.getMinutes();
    res.send('Hora Atual: ' + hora + ":" + minuto);
})

app.get('/saudacao', (req, res) => {

    res.send("Olá, " + req.query.nome)
})
console.log("Servidor Rodando na porta 3000")
app.listen(3000)