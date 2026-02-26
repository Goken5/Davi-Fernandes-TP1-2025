const port = 4000;

const express = require('express');
const fs = require('fs').promises;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded());

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
app.post("/perguntas", async(req, res) => {
    console.log(req)
    try{
        const dados = req.body;
        console.log(dados)
        await fs.appendFile('app.json', JSON.stringify(dados) + '\n', 'utf-8');
        console.log("Deu bom", { ...dados });
    } catch(err){
        console.error("Deu ruim", err);
    }
    res.send("Pergunta Recebida!");
});
app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`);
}); 