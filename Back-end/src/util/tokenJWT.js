import jwt from "jsonwebtoken";


export function createToken(user){

    const token = jwt.sign({email:user.email,id:user.id,name: user.name},process.env.TOKEN,{expiresIn:"1h"});

    if(!token)return false;
    console.log("token criado com sucesso");
    return token;    
}

export function verifyToken(token){
    try {
        
        const verify = jwt.verify(token, process.env.TOKEN);
        
        return verify;
        
    } catch (error) {
        console.error("falha ao verificar o token: ", error);
        return false;
    }
}
