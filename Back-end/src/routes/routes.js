
import {Router} from 'express'
import { User } from '../controller/userControler.js';
import { Tmdb } from '../services/tmdb.js';



const route = Router();
//teste de rota
route.get("/", (req,res)=>{res.send("Conexão funcionando corretamente")})

//instancia a classe user
const user = new User();
const tmdb = new Tmdb()

//rotas de usuário
route.post("/api/login", user.login)
route.post("/api/register/user", user.create)

//rotas das outras APIS
//rota de teste de conexão com a API
route.get("/api/test", tmdb.testConnection)
route.get("/api/search", tmdb.Search)
route.get("/api/trending", tmdb.Trending)


export default route;
