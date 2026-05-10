import { userCreate, userLogin } from "../repositories/userRepositories.js";
import { messageError, messageSuccess } from "../util/message.js";


export class User{
  

   async create(req,res){
    try {
        //verifica se foram enviados dados no corpo da requisição
        if(!req.body)return messageError(res,400,"o body da requisição não foi enviado")
        
        //guarda o dados que foram recebidos     
        const{name,email,password} = req.body;

        //verifica se os dados foram enviados corretamente e se não faltou nenhum
        if(!name || !email, !password)return messageError(res,400,"dados enviados incorretamente");

        //chama a função que ira adicionar o usuário no banco
        const user = await userCreate(name,email,password)

        //caso a criação no banco de errado
        if(!user)return messageError(res,400,"falha ao registrar novo usuário")
        
        //se tudo deu certo retorna sucesso    
        return messageSuccess(res,201,"usuário criado com sucesso");
        
    } catch (error) {
        console.error("Erro ao criar novo usuário: ", error.message)
        return messageError(res,400,"falha ao criar usuário");
    }


   } 

    async login(req,res){
    try {

       if(!req.body)return messageError(res,400,"o body da requisição nãoi foi enviado");

       const{email,password} = req.body;

       if(!email,!password)return messageError(res,400,"dados enviados incorretamente")
       
       const result = await userLogin(email,password);
       
       if(!result)return messageError(res,400,"falha ao efetuar o login corretamente")

       return messageSuccess(res,200, result) 

        
    } catch (error) {
        console.error("Erro ao verificar se o usário existe para o login: ", error.message)
        return messageError(res,400,"falha ao verificar login")
    }
    }
}