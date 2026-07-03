import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { SearchStreaming } from "../service/moviesAndTv.js";



export default function Tvmovie({navigation,route}){
    const[dataTvMovie,setDataTvMovie] = useState([])
    const[streaming,setStreaming] =useState([])

    useEffect(()=>{
        const{tvMovie} = route.params
        console.log("dados enviados: ", tvMovie)        
        handleStreaming(tvMovie)       
       
    },[])

    async function handleStreaming(tvMovie){        
        try {
            setDataTvMovie(tvMovie);            
            const streamingFinded = await SearchStreaming(tvMovie);
            if(!streamingFinded){
                console.log("falha ao encontrar dados")
            }else{ 
                console.log("dados que retornaram para a tela: ", streamingFinded);               
                setStreaming(streamingFinded)
            }
        } catch (error){
            console.error("falha ao carregar dados do filme ou série")
        }
    }

    
  
    return(
        <View>
            <Text>Olá mundo</Text>
              {/*<View style={{justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#6200EE" />
            </View>*/}
        </View>
    )
}