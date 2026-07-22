import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from "react-native"
import {useFocusEffect} from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';
import { useCallback, useEffect, useState } from "react";
import { allUserIntrests } from "../service/moviesAndTv";


export default function Interests({navigation}){
    const [dataMovies,setDataMovies] = useState([]);
    const [dataTv,setDataTv] = useState([]);
    const [loading,setLoading] = useState(true);
  
    //sempre recarrega os dados da pagina para manter sempre atualizado
    useFocusEffect(
        useCallback(()=>{
            getMyMoviesTv();
        },[])
    )

   
    //função que busca os dados;
    async function getMyMoviesTv(){
        try {

            const result = await allUserIntrests();
            //console.log("dados que retornaram: ", result);

            if(result){
                setDataMovies(result.movie);
                setDataTv(result.tv);
                setLoading(false)
            }else{
                console.error("dados não chegaram na pagina");
            }
            
        } catch (error) {
            console.error("não foi possivel retornar os dados corretamente");
        }
        
    }

    //componente que retorna a lista de filmes e séries
        const LIST = ({movieTv})=>{
    
            return(
                <TouchableOpacity onPress={()=>navigation.navigate("TvMovie",{tvMovie:movieTv})}>
                    <ImageBackground
                        source={{
                            uri:`https://image.tmdb.org/t/p/w500${movieTv.backdrop_path}`
                        }}
                        style={styles.card}
                        imageStyle={styles.image}
                    >
                    {movieTv.title &&(
                         <Text style={styles.textCard}>{movieTv.title}</Text>
                    )}    
                    {movieTv.tv_name &&(
                        <Text style={styles.textCard}>{movieTv.tv_name}</Text>
                    )}
    
                    </ImageBackground>
    
    
                </TouchableOpacity>
            )}

    return(
       <ScrollView style={styles.container}>

        {/*cabecalho*/}
        <View style={styles.header}>
            <Feather name="heart" size={33} color="#343B77"/>
            <Text style={styles.title}>Meus Interesses</Text>
        </View>

        {/*view apenas para usar de margem */}
        <View style={{borderWidth:1, borderBottomColor:'#7B837E'}}></View>

        {/* lista filmes e séries de interesse*/}
        <View style={styles.body}>


        {loading &&(
            <>
                 {/*icone que fica girando enquanto aguarda os dados*/} 
                <View style={{marginTop:"20%"}}>
                    <ActivityIndicator color={"#4F39F6"} size={"large"}/>
                </View>
            </>
        )}

        {/*renderiza os dados da tela dinamicamente*/}
        <FlatList
            data={dataMovies}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=> <LIST movieTv={item} />}
             scrollEnabled={false}
        />
        <FlatList
            data={dataTv}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=> <LIST movieTv={item} />}
             scrollEnabled={false}
        />
       

        </View>

       </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#020618',
        flex:1,

    },
    header:{
        flexDirection:'row',
        marginTop:'16%',              
        width:'90%',
        alignSelf:'center',
        marginBottom:'8%'                    
    },
    body:{
        marginTop:'10%',
        width:'90%',
        alignSelf:'center',
        marginBottom:"32%"       

    },
    title:{
        color:'#7B837E',
        fontSize:30,
        marginLeft:'4%'
    },
    card:{        
        width: "100%",
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
        
        
    },
    image:{
        borderRadius:15,
        opacity:0.4       
        
    },
    textCard:{
        color:'#fff',
        
    }
})