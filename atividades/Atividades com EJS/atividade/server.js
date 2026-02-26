const port = 8080;

const express = require('express');
const fs = require('fs').promises;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/receitas", (req, res) => {
    res.render("receitas");
});
app.get("/fotos", (req, res) => {
    res.render("fotos");
});
app.get("/detalhes", (req, res) => {
    res.render("detalhes");
});
app.get("/contato", (req, res) => {
    res.render("contato");
});
app.post("/perguntas", (req, res) => {
    async function appendToFile() {
        try{
            const dados = req.body;
            await fs.appendFile('app.log', JSON.stringify(dados) + '\n', 'utf-8');
            console.log("Deu bom");
        } catch(err){
            console.error("Deu ruim", err);
        }
    }
    appendToFile()
    res.send("Resposta Recebida!");
});
app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`);
}); 