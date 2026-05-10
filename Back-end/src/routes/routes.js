
import {Router} from 'express'
import { User } from '../controller/userControler.js';

const route = Router();
//teste de rota
route.get("/", (req,res)=>{res.send("Conexão funcionando corretamente")})

//instancia a classe user
const user = new User();

//rotas de usuário
route.post("/api/login", user.login)
route.post("/api/register/user", user.create)


export default route;
