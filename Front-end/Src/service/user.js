import { getToken, saveNameEmailId, saveToken } from "./secureStore.js";

const URL = "http://192.168.3.43:3000/api/";



const options = (method, body)=>{
    
    if(body){
        return{
        method:method,
        headers:{'Content-Type' :'application/json'},
        body:JSON.stringify(body)
        }

    }else{
        return{
        method:method,
        headers:{'Content-Type' :'application/json'}
        }
    }
}


export async function userLogin(email,password){
    try {

        const result = await fetch(`${URL}login`, options("POST",{email:email, password:password}));
        
        if(!result.ok)throw new Error("falha ao realizar login");
       const res = await result.json();
       await saveToken(res.token);
       await saveNameEmailId(res.nome,res.email,res.id);
       
       
       return true;        
        
    } catch (error) {
        console.error("falha ao fazer o login do usuário: ", error);
        return false;
    }
    
}