
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