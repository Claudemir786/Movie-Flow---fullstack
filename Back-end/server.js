import express from 'express'
import cors from 'cors'
import route from './src/routes/routes.js';

//importa otenv para ler o arquivo .env e pegar as variaveis contidas lá
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())
app.use(route)

app.listen(3000, ()=>console.log("servidor rodando na porta 3000"))
