import { addMovie, addTv, interests, remove, userCreate, userInterestsId, userLogin } from "../repositories/userRepositories.js";
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

    //adiciona ao favoritos (interesses)
    async movieTv(req,res){
        try{
            //console.log("cheguei aqui: ", req.body)
            //verifica se veio algo no corpo da requisição
            if(!req.body)return messageError(res,400,"o body da requisição nãoi foi enviado");

            //se for série
            if(req.body.media_type === "tv"){
               const{id,id_user,backdrop_path,media_type,first_air_date,vote_average,name,overview} = req.body;
                if(!id,!id_user,!backdrop_path,!media_type,!first_air_date,!vote_average,!name,!overview) return messageError(res,401,"dados enviados incorretamente");

                const result = await addTv(id,id_user,backdrop_path,media_type,first_air_date,vote_average,name,overview)
                if(!result)return messageError(res,401,"Falha ao adicionar serie no banco de dados")
                 
                return messageSuccess(res,201,"Série adicionada com sucesso");

            //se for filme    
            }else if(req.body.media_type === "movie"){
                const{id,id_user,backdrop_path,media_type,release_date,vote_average,title,overview}=req.body;
                if(!id,!id_user,!backdrop_path,!media_type,!release_date,!vote_average, !title, !overview) return messageError(res,401,"dados enviados incorretamente")
                    
                const result = await addMovie(id,id_user,backdrop_path,media_type,release_date,vote_average,title,overview)  

                 if(!result)return messageError(res,401,"Falha ao adicionar serie no banco de dados")
                
                return messageSuccess(res,201,"Filme adicionado com sucesso");

            }

        }catch(error){
            console.error("Erro ao adicionar filme ou serie: ", error.message)
            return messageError(res,400,"falha ao salvar dados");
        }
    }

    //manda os ids de séries e filmes que estão armazenadas no banco de dados referente ao usuário
    async getInterests(req,res){
        try {
         
            const result = await userInterestsId(1);
            if(!result)throw new Error("os dados não retornaram corretamente do banco de dados");

            return res.status(200).json({success:true,ids:result});
            
        } catch (error) {
            console.error("Erro ao buscar ids de filmes e séries do usuário: ", error.message)
            return messageError(res,400,"falha ao buscar dados");
        }
    }

    async getInterestsAll(req,res){
        try{

            const result = await interests(1);

            if(!result)throw new Error("os dados não retornaram corretamente do banco de dados");
            
            return res.status(200).json({success:true,movie:result.movie,tv:result.tv});

        }catch(error){
            console.error("Erro ao buscar dados completos de filmes e séries do usuário: ", error.message)
            return messageError(res,400,"falha ao buscar dados");
        
        }
    }

    async RemoveInterests(req,res){
        try {
            //console.log("teste de chegada: ",req.body)
            const {id, type} = req.body;
            const idUser = 1;
            if(!id,!type)return messageError(res,401,"Dados enviados incorretamente");
            
            const result = await remove(id,idUser,type);
           
            if(!result)return messageError(res,401,"não foi possivel remover com sucesso");

            return messageSuccess(res,200,"removido com sucesso");
            
        } catch (error) {
            console.error("Erro ao remover filme ou série do usuário: ", error.message);
            return messageError(res,400,"falha ao remover filme ou série dos interesses do usuário");
        }
    }
}