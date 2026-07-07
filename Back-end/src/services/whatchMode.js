import { messageError, messageSuccess } from "../util/message.js"




export class WhatchMode{


    async test(req,res){
        try{
            const result = await fetch(`https://api.watchmode.com/v1/sources/?apiKey=${process.env.WATCHMODE_KEY}`)

            if(!result.ok)throw new Error("falha ao conectar a API WATCHMODE")
            return res.status(200).json({success:true, message:'Conectado com sucesso'})    

        }catch(error){
            console.log("Erro ao conectar: ", error.message)
            return messageError(res,401,"Falha ao conectar a API, API não encontrada")
        }
        
    }

    async findPlataform(req,res){
        try{
            //busca o id da serie ou filme
            const type = req.query.name;
            const id = req.query.id;
            //se não vier o paramêtro
            if(!type || !id)throw new Error("parametro não foi enviado corretamente") 
                
            
            if(type == "tv"){
                //chama a função que ira buscar as plataformas da serie em questão
                const plataform = await findTvMovie(id,'tmdb_tv_id');
                //caso o retorno seja false
                if(!plataform)return messageError(res,401,"falha ao encontar serie na base de dados")
                 //retorna sucesso e o array com as plataformas 
                return res.status(200).json({success:true, plataform:plataform})
                    


            }else if(type == "movie"){
                //chama a função que ira buscar as plataformas de streaming do filme em questão
                const plataform = await findTvMovie(id,"tmdb_movie_id")
                //caso o retorno seja false
                if(!plataform)return messageError(res,401,"falha ao encontar filme na base de dados")
                //retorna sucesso e o array com as plataformas    
                return res.status(200).json({success:true, plataform:plataform})

            }else{
                //pode acontecer de não vir nem um nem outro 
                return res.status(200).json({success:true, type:undefined})
            }                            

               

        }catch(error){
            console.log("Erro: ", error.message)
            return messageError(res,401,"falha ao realizar o processo de busca das plataformas diponiveis");
        }
    }
}


 async function findTvMovie(id,tvOrMovie){
    try {
        //busca o Id do watchmovie
        const result = await fetch(`https://api.watchmode.com/v1/search/?apiKey=${process.env.WATCHMODE_KEY}&search_field=${tvOrMovie}&search_value=${id}`)
        //mensagem de erro caso não encontre
        if(!result.ok)throw new Error("Dados a respeito do código da serie ou filme em questão não retornaram da API");
        const codWhatchmode = await result.json();
        //envia o id enontrado e recebe as plataformas de streamings encontradas 
        const plataformFinded = plataform(codWhatchmode.title_results[0].id)
        if(!plataformFinded)return false
        
        return plataformFinded;

    } catch (error) {
        console.log("erro ao encontrar codigo da serie ou filme no watchmode: ", error);
        return false;
    }
    
 }

 async function plataform(id){
    try {
        //busca os dados de streaming
        const result = await fetch(`https://api.watchmode.com/v1/title/${id}/sources/?apiKey=${process.env.WATCHMODE_KEY}`)
        //mensagem de erro caso não encontre
        if(!result.ok)throw new Error("Dados a respeito das plataformas de straming não retornaram");
        const plataformStreaming = await result.json();

        //faz um array com apenas os nomes da plataformas de streaming
        let list = plataformStreaming.map(item => {return {name:item.name,web_url:item.web_url,seasons:item.seasons}})
        //remove duplicatas no lista
        const listStreaming = list.filter((item, index) => {
            return index === list.findIndex(other => other.name === item.name);
        });
    

        return listStreaming

        return unicList;
    } catch (error) {
        console.log("erro ao buscar dados relacionado ao streaming: ", error)
        return false
    }
 }
 //2316




