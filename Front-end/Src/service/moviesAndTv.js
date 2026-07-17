
//URL padrão 
const URL = "http://192.168.3.43:3000/api/";

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
       // console.log("dados da função que envia para API: ", dataTvMovie);
        let result;
      //se for filme  
      if(dataTvMovie.title){
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
        if(dataTvMovie.title){
            movie ={"id":dataTvMovie.id,"id_user":1,"backdrop_path":dataTvMovie.backdrop_path, "media_type":"movie",
                                        "release_date":dataTvMovie.release_date, "vote_average":dataTvMovie.vote_average,
                                        "title":dataTvMovie.title, "overview":dataTvMovie.overview} 
                                       
            const result = await fetch(`${URL}addMovieTv`,options("POST",movie))

            if(!result.ok)throw new Error("falha na requisição dados não retornaram corretamente");
            const res = await result.json();
            return res;

         //filtra e cria o json de série   
        }else if(dataTvMovie.name || dataTvMovie.tv_name){
            //id,id_user,backdrop_path,media_type,first_air_date,vote_average,name,overview
            tv = {"id":dataTvMovie.id,"id_user":1,"backdrop_path":dataTvMovie.backdrop_path, "media_type":"tv",
                                        "first_air_date":dataTvMovie.first_air_date, "vote_average":dataTvMovie.vote_average,
                                        "name":dataTvMovie.name || dataTvMovie.tv_name, "overview":dataTvMovie.overview}

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

//busca os filmes e séries do usuário na api e recebe e envia os ids 
export async function userInterests(){
    try {
        const result =  await fetch(`${URL}userInterests`,options("GET"));
        if(!result.ok)throw new Error("falha ao receber dado da API")
        const res = await result.json();
        return res.ids;    
        
    } catch (error) {
        console.error("não foi possivel buscar ids de filmes e séries do usuário")
        return false;
    }
}

export async function listCategorySelected(category,type) {
    try {

        const result = await fetch(`${URL}category?type=${type}&category=${category}`, options("GET"));
        if(!result.ok)throw new Error("Falha ao reber dados da API");
        const res = await result.json();
        return res.list.results;
        
    } catch (error) {
        console.error("não foi possivel buscar dados da categoria selecionada")
        return false;
    
    }
}

//busca os dados completos de filmes e séries adicionados como insteresses 
export async function allUserIntrests(){
    try {
        
        const result = await fetch(`${URL}interests`, options("GET"));

        if(!result.ok)throw new Error("falha ao receber dados corretamente da API");

        const res = await result.json();
        return {movie:res.movie, tv:res.tv}
        
    } catch (error) {
        console.error("não foi possivel retornar os dados completos de filmes e séries do usuário");
        return false;

    }
}

export async function removeMovieTv(data) {
    try {
        let result;
        //console.log(data)
        //se for filme
        if(data.title){
            result = await fetch(`${URL}removeInterests`,options("DELETE",{id:data.id, type:"movie"}));

        //se for tv    
        }else if(data.name || data.tv_name){

             result = await fetch(`${URL}removeInterests`,options("DELETE",{id:data.id, type:"tv"}));

        }

        if(!result.ok)throw new Error("a remoção fracassou");

        return true;
        
    } catch (error) {
        console.error("não posivel remover série ou filme dos interesses");
        return false;
    }
}