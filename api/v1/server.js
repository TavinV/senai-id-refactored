import app from './app.js';
import connectDB from "./utils/MongoDB_Connection.js";
const port = 3000

// Iniciando o servidor
connectDB().then(async () => {

    app.listen(port, () => { console.log("Ativo na porta " + port) })

}).catch((erro_conexao) => {
    console.log("Conexão com o banco de dados falhou.")
    console.log(erro_conexao)
})