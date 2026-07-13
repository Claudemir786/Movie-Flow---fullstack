
import {Router} from 'express'
import { User } from '../controller/userControler.js';
import { Tmdb } from '../services/tmdb.js';
import { WhatchMode } from '../services/whatchMode.js';



const route = Router();
//teste de rota
route.get("/", (req,res)=>{res.send("Conexão funcionando corretamente")})

//instancia a classe user
const user = new User();
const tmdb = new Tmdb();
const watchMode = new WhatchMode();

//rotas de usuário
route.post("/api/login", user.login)
route.post("/api/register/user", user.create)
route.post("/api/addMovieTv", user.movieTv)

//rotas das outras APIS
//rota de teste de conexão com a API
route.get("/api/test", tmdb.testConnection)
route.get("/api/search", tmdb.Search)
route.get("/api/trending", tmdb.Trending)


//rotas watchmode
//rota de teste
route.get("/api/test/watch", watchMode.test)
route.get("/api/plataform", watchMode.findPlataform)


export default route;
