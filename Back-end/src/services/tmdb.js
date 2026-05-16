import { messageError, messageSuccess } from "../util/message.js";

const options = (method)=>{
    return {
        method:method,
        headers:
        {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    }

}


const defaultEndpoint = "https://api.themoviedb.org/3/"
//região e idioma do Brasil
const languageRegion = "&language=pt-BR&region=BR"

export class Tmdb{

    //primeira usada apenas para testar a conexão
    async testConnection(req,res) {
        try {

            const result = await fetch(`${defaultEndpoint}authentication`,options('GET'))
            if(!result.ok)throw new Error("falha ao encontrar API externa")           
            const movieSerie = await result.json();
            return res.status(200).json({result:movieSerie})

        } catch (error) {
            console.error("falha ao se comunicar com a API TMDB: ", error)
            return messageError(res,500,"falha ao encontrar")
            
            
        }
}

    //busca filmes e series por nome
    async Search(req,res){
        
        try {

            if(!req.body)return messageError(res,400,"body não foi enviado")
            const{search} = req.body
            if(!search)return messageError(res,400,"o dado foi enviado incorretamente") 
            //codifica o nome de busca para não ser interpretado errodo caso o nome de busca tenha espaço ou algum caracter diferente por exemplo 
            const searchName = encodeURIComponent(search);

            const result  = await fetch(`${defaultEndpoint}search/multi?query=${searchName}${languageRegion}`,options("GET"))

            if(!result.ok)throw new Error("Dados não retornam corretamente da API externa TMDB")
            const resultSearch = await result.json()
            
            return res.status(200).json({success:true, resultSearch})
                
                
            
        } catch (error) {
            console.error("falha na busca por nome: ", error)
            return messageError(res,401,"não foram encontrados informações para essa busca")
        }
    }

    //retorna os filmes e séries que estão em alta no momento 
    async Trending(req,res){

        try {

            const result = await fetch(`${defaultEndpoint}trending/all/day?${languageRegion}`, options('GET'))
            if(!result.ok)throw new Error("Dados não retornam corretamente da API externa TMDB")
            
            const trending = await result.json();
            return res.status(200).json({success:true, trending})

            
        } catch (error) {
            console.error("falha na buscar oa mais populares: ", error)
            return messageError(res,401,"não foram encontrados informações para essa busca")
        }
    }
}
