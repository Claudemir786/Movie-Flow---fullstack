
import {Router} from 'express'
import { User } from '../controller/userControler.js';
import { Tmdb } from '../services/tmdb.js';
import { WhatchMode } from '../services/whatchMode.js';
import { Auth } from '../middleware/auth.js';


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
route.post("/api/addMovieTv", Auth, user.movieTv)
route.get("/api/userInterests",Auth, user.getInterests);
route.get("/api/interests", Auth, user.getInterestsAll);
route.delete("/api/removeInterests",Auth, user.RemoveInterests);
route.put("/api/change/nameEmail", Auth, user.updateNameEmail);
route.put("/api/change/password",Auth, user.updatePassword);
route.delete("/api/delete/user", Auth, user.delete);


//rotas das outras APIS
//rota de teste de conexão com a API
route.get("/api/test", Auth, tmdb.testConnection)
route.get("/api/search",Auth, tmdb.Search)
route.get("/api/trending",Auth, tmdb.Trending)
route.get("/api/category",Auth, tmdb.GetCategory)


//rotas watchmode
//rota de teste
route.get("/api/test/watch",Auth, watchMode.test)
route.get("/api/plataform",Auth, watchMode.findPlataform)


export default route;
