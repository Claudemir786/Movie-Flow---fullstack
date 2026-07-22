import { authHeader } from "./moviesAndTv.js";
import { getToken, saveNameEmailId, saveToken } from "./secureStore.js";

const URL = "http://192.168.3.43:3000/api/";



//utilizado para retornar o metodo e headers da requisição
const options = async (method, body)=>{
    if(body){
        return{
        method:method,
        headers:await authHeader(),
        body:JSON.stringify(body)
        }

    }else{
        return{
        method:method,
        headers:await authHeader()
        }
    }
}



const optionsLogin = (method, body)=>{
    
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

        const result = await fetch(`${URL}login`, optionsLogin("POST",{email:email, password:password}));
        
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
export async function alterEmailName(name,email){
    try {
        console.log(`nome : ${name}, email ${email}`);

        const result = await fetch(`${URL}change/nameEmail`, await options("PUT",{name:name, email:email}));

        if(!result.ok)throw new Error("dados de alteração não retornaram com sucesso")
        return true;

    } catch (error) {
        console.error("falha ao altera email e nome: ", error);
        return false;
    }

}

export async function deleteAccount() {
    try {

        const result = await fetch(`${URL}delete/user`, options("DELETE"));

        if(!result.ok)throw new Error("dados não retornaram corretamente");
        
        return true;
        
    } catch (error) {
        console.error("falha ao esxluir conta do usuário: ", error);
        return false;
    }
}