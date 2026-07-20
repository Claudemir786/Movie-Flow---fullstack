import { messageError } from "../util/message.js";
import { verifyToken } from "../util/tokenJWT.js";




export async function Auth(req,res,next){
    try {
       
        //pega o cabeçalho da requisição
        const header = req.headers.authorization;
        if(!header)return messageError(res,401,"header da requisição não foi enviado");

        const [type,token] = header.split(" ");
        if(type !== "Bearer" || !token)return messageError(res,401,"token ou tipo enviados incorretamente");

        const verify = verifyToken(token);//chama a função que veriica o token

        if(!verify)return messageError(res,400,"token invalido");

        req.user = verify

        next();
        
    } catch (error) {
        console.error("falha ao autenticar o token: ",error.message);
        return messageError(res,401,"Falha ao autenticar o token");
    }
}