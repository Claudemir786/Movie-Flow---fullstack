import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Linking, FlatList } from "react-native";
import { SearchStreaming } from "../service/moviesAndTv.js";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';





export default function Tvmovie({navigation,route}){
    const[dataTvMovie,setDataTvMovie] = useState([])
    const[streaming,setStreaming] = useState([])
    const[notFound,setNotFound] = useState(false)
    const[loading,setLoading] = useState(true)

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
                //console.log("dados que retornaram para a tela: ", streamingFinded);               
                setStreaming(streamingFinded)
                setLoading(false)
                if(streamingFinded == ""){
                    setNotFound(true)
                    
                }
            }
        } catch (error){
            console.error("falha ao carregar dados do filme ou série")
        }
    }


// abrir links dos sites
async function openLink(url) {

    const open = await Linking.canOpenURL(url)

    if(open){
        await Linking.openURL(url)
    }else{
        alert("não foi possivel abrir o link para a plataforma")
    }
}

//componente que renderiza os opções de streaming
const RenderListStreaming =({plataform})=>{
    return(
        <>
         {/*plataformas disponiveis*/}
            <View style={styles.plataforms}>

                <TouchableOpacity style={styles.card} onPress={()=> openLink(plataform.web_url)}>
                    
                    <View style={styles.sectionCard}>
                        <Text style={{color:'#fff', fontSize:23}}>{plataform?.name}</Text>
                        <Text style={{fontSize:18,color:'#808180', marginTop:'2%'}}>Plataforma</Text>
                    </View>
                </TouchableOpacity>                  
                

            </View>
            </>
    )

}
    

  
    return(
       <ScrollView style={styles.container}>
            
            {/*Imagem de fundo*/}
            <ImageBackground 
                 source={//require('../Assets/i554287.jpeg')
                    {uri:`https://image.tmdb.org/t/p/w500${dataTvMovie.backdrop_path}`}
                    }
                    style={styles.backgroundImage}
                    imageStyle={styles.image}
                    
            >
            {/*baloes de filme,ano e classificação*/}
                <View style={styles.sectionInfo}>

                    <View style={styles.info}>
                        {/*se for filme */}
                        {dataTvMovie.media_type === "movie" && (
                             <Text style={styles.textInfo}>Filme</Text>
                        )}
                        {/*se for série*/}
                        {dataTvMovie.media_type === "tv" && (
                             <Text style={styles.textInfo}>Série</Text>
                        )}
                       
                    </View>

                    <View style={[styles.info,{backgroundColor:'#272939',flexDirection:'row'}]}>
                        <Feather name="calendar" size={20} color="#fff" />
                        {/*renderiza o ano de lançamento*/}
                        <Text style={[styles.textInfo,{marginLeft:'5%'}]}>
                            {dataTvMovie.release_date? dataTvMovie.release_date.slice(0,4):" "}
                            {dataTvMovie.first_air_date? dataTvMovie.first_air_date.slice(0, 4) : " "}
                            </Text>
                    </View>

                    <View style={[styles.info,{backgroundColor:'#372D19',flexDirection:'row'}]}>
                        <AntDesign name="star" size={20} color="#FDC700" />
                        <Text style={[styles.textInfo,{color:'#FDC700',marginLeft:'5%'}]}>{parseFloat(dataTvMovie.vote_average).toFixed(2) }</Text>
                    </View>
                </View>

                {/*Titulo do filme ou serie*/}
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>{dataTvMovie.title}{dataTvMovie.name}</Text>
                </View>

                {/*botão de adicionar aos intereses*/}
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.button} onPress={()=> alert("adicionado com sucesso")}>
                        <Feather name="bookmark" size={25} color="black" />
                        <Text style={styles.textButton}>Adicionar aos interesses</Text>
                    </TouchableOpacity>

                </View>            
                
                {/*Sinopse */}
                <View style={styles.viewSinopse}>
                    <Text style={styles.textSinopse}>{dataTvMovie.overview}</Text>
                </View>

            </ImageBackground>
            
            {/*titulo de plataformas disponiveis*/}
            <View style={styles.subtitle}>
                <Feather name="play-circle" size={45} color="#4F39F6" />
                <Text style={styles.TextSubTitlePlataforms}>Disponível em</Text>
            </View>

            <FlatList 
                data={streaming}
                keyExtractor={(item) => item.id}
                renderItem={({item})=> <RenderListStreaming plataform={item} />}
            />
            
            {/*componente de loading que fica girando até carregar as informações */}
            {loading &&(
                <>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"large"} color={"#4F39F6"}/>
                    </View>
                </>
            )}

            {/*caso não tenha dados a respoeito das plataformas*/}
            {notFound &&(
                <>
                    <View style={styles.plataforms}>

                        <TouchableOpacity style={styles.card} onPress={()=> openLink(plataform.web_url)}>
                            
                            <View style={styles.sectionCard}>
                                <Text style={{color:'#fff', fontSize:23}}>Sem dados de plataformas para esse filme/série😑</Text>
                                
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
                
            )}

           <View style={{marginTop:"20%"}}></View>         

       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#020618',
        
        
    },
    backgroundImage:{
        width: "100%",
        height: 500,       
        
        
    },
    image:{        
        opacity:'10%',
        justifyContent:'center',
        alignItems:'center'        
    },
    TextSubTitlePlataforms:{
        fontSize:25,        
        color:'#fff',
        marginLeft:'3%',
        fontWeight:'600',
       
    },
    subtitle:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:'25%',
        width:'90%',
        alignSelf:'center'       

    },
    plataforms:{
        width:'90%',
        alignSelf:'center'
    }, 
    card:{
        backgroundColor:'#080E22',
        borderRadius:15,
        marginTop:'5%'
    },
    sectionCard:{
        padding:12,       
        
    },
    info:{
        backgroundColor:'#4F39F6',
        justifyContent:'center',
        height:'80%',
        width:'20%',
        borderRadius:15,
        marginLeft:'5%',
        alignSelf:'center',        
        alignItems:'center',
        padding:8

    },
    textInfo:{
        color:"#fff",
        fontSize:13
        
        
    },
    sectionInfo:{
        flexDirection:'row',
        width:'90%',        
        marginTop:'10%'
    },
    title:{
        color:'#fff',
        fontSize:40,
        fontWeight:'bold',

    },
    viewTitle:{
        width:'90%',
        alignSelf:'center',
        marginTop:'5%',
    },
    button:{
        backgroundColor:'#fff',
        flexDirection:'row',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        height:'200%'

    },
    viewButton:{
        width:'90%',
        alignSelf:'center',
        marginTop:'5%',
        marginBottom:'5%'

    },
    textButton:{
        fontWeight:'700',
        fontSize:20,
        marginLeft:'2%'
    },
    viewSinopse:{
        width:'90%',
        alignSelf:'center',
        marginTop:'10%'
    },
    textSinopse:{
        color:'#ffffffb6',
        fontSize:15,
        fontWeight:'500'
    }

})