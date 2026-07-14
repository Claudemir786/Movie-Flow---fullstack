
//URL padrão 
const URL = "http://localhost:3000/api/";

//utilizado para retornar o metodo e headers da requisição
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

//retorna os filmes e séries que estão em alta
export async function Trending(){
    try{

        const result = await fetch(`${URL}trending`, options("GET"))

        //se o resultado falhar e os dados não voltarem
        if(!result.ok)throw new Error("Requisição falhou, dados chegaram incorretamente")
        
        const moviesAndFilms = await result.json();
        return moviesAndFilms.trending.results;

    }catch(error){
        console.error("Erro, não foi possivel fazer a requisição corretamente: ", error)
        return false;
    }
}

//retorna os filmes e series pesquisados por nome
export async function SearchMovieTv(title){
    try {
        console.log(title)
        const result = await fetch(`${URL}search?search=${title}`, options("GET"))
        if(!result.ok)throw new Error("Requisição falhou, dados chegaram incorretamente")
         
        const moviesAndFilms = await result.json();
        return moviesAndFilms.result.results;    
        
    } catch (error) {
        console.error("Erro, não foi possivel fazer a requisão corretamente: ", error)
        return false;
    }
}

export async function SearchStreaming(dataTvMovie){   
    try {
        let result;
      //se for filme  
      if(dataTvMovie.media_type === "movie"){
        result = await fetch(`${URL}plataform?name=movie&id=${dataTvMovie.id}`, options("GET"))
        
      //se for serie  
      }else{
        result = await fetch(`${URL}plataform?name=tv&id=${dataTvMovie.id}`, options("GET"))

      }
      if(!result.ok)throw new Error("Falha ao retornar dados da API")
      const streaming = await result.json();
      return streaming.plataform;    
      
        
    } catch (error) {
        console.error("Não foi possivel encontrar dados de streaming: ", error)
        return false
    }

}

export async function addMovieTv(dataTvMovie){
    try {
        let movie;
         let tv;
        // filtra ecria o json de filme
        if(dataTvMovie.media_type === "movie"){
            movie ={"id":dataTvMovie.id,"id_user":1,"backdrop_path":dataTvMovie.backdrop_path, "media_type":dataTvMovie.media_type,
                                        "release_date":dataTvMovie.release_date, "vote_average":dataTvMovie.vote_average,
                                        "title":dataTvMovie.title, "overview":dataTvMovie.overview} 
                                       
            const result = await fetch(`${URL}addMovieTv`,options("POST",movie))

            if(!result.ok)throw new Error("falha na requisição dados não retornaram corretamente");
            const res = await result.json();
            return res;

         //filtra e cria o json de série   
        }else if(dataTvMovie.media_type ==="tv"){
            //id,id_user,backdrop_path,media_type,first_air_date,vote_average,name,overview
            tv = {"id":dataTvMovie.id,"id_user":1,"backdrop_path":dataTvMovie.backdrop_path, "media_type":dataTvMovie.media_type,
                                        "first_air_date":dataTvMovie.first_air_date, "vote_average":dataTvMovie.vote_average,
                                        "name":dataTvMovie.name, "overview":dataTvMovie.overview}

            const result = await fetch(`${URL}addMovieTv`,options("POST",tv))

            if(!result.ok)throw new Error("falha na requisição dados não retornaram corretamente");
            const res = await result.json();
            return res;
                                       
        }

      
        
    } catch (error) {
        console.error("não foi posssivel adicionar aos interesses");
        return false
    }

}

export async function userInterests(){
    try {
        const result =  await fetch(`${URL}userInterests`,options("GET"));
        if(!result.ok)throw new Error("falha ao receber dado da API")
        const res = await result.json();
        return res.ids;    
        
    } catch (error) {
        console.error("não foi possivel buscar dados de filmes e séries do usuário")
        return false;
    }
}