import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, StyleSheet, ImageBackground, TouchableOpacity, Linking, FlatList } from "react-native";
import { addMovieTv, SearchStreaming, userInterests } from "../service/moviesAndTv.js";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Tvmovie({navigation,route}){
    const[dataTvMovie,setDataTvMovie] = useState([])
    const[streaming,setStreaming] = useState([])
    const[notFound,setNotFound] = useState(false)
    const[loading,setLoading] = useState(true)
    const[added,setAdded] = useState(false);
    const [idsMovieTv,setIdsMovieTv] = useState([]);

    useEffect(()=>{
        const{tvMovie} = route.params
        //console.log("dados enviados: ", tvMovie)        
        handleStreaming(tvMovie);  
         //buscas os dados do usuário
        getMyinterests(tvMovie);   
       
    },[])
   

    async function getMyinterests(tvmovie) {
        try {
            const result = await userInterests();
            //console.log(result);            
            if(result){                
                setIdsMovieTv(result);   
                 if(result.includes(tvmovie.id)){
                    setAdded(true);
                 }            
               
            }else{
                console.log("falha ao carregar ids de filmes e séries do usuário");
            }
            
        } catch (error) {
            console.log("falha ao buscar dados de filmes e séries do usuário")
        }
        
    }

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

async function add(){
    try {        
        //id,id_user,backdrop_path,media_type,release_date,vote_average,title,overview
        const result = await addMovieTv(dataTvMovie);
        //console.log("dados que retornaram na pagina: ", result);

        if(result){
            alert("adicionado com sucesso");
            setAdded(true);

        }else{
            alert("falha ao adicionar aos interesses");
        }


    } catch (error) {
        console.error("falha ao adicionar aos interesses")
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
       <View style={styles.container}>
            
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
                        {dataTvMovie.title && (
                             <Text style={styles.textInfo}>Filme</Text>
                        )}
                        {/*se for série*/}
                        {dataTvMovie.name && (
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
                {/*se ele não estiver adicionado aos interesses*/ }
                {!added &&(
                    <>
                        <View style={styles.viewButton}>
                            <TouchableOpacity style={styles.button} onPress={()=>add()}>
                                <Feather name="bookmark" size={25} color="black" />
                                <Text style={styles.textButton}>Adicionar aos interesses</Text>
                            </TouchableOpacity>

                        </View>
                    </>
                )}

                {/*se ja estiver adicionado */}
                {added &&(
                     <>
                        <View style={styles.viewButton}>
                            <TouchableOpacity style={[styles.button,{backgroundColor:'#413f3fb7'}]}>
                                <Feather name="bookmark" size={25} color="#6d6a6a" />
                                <Text style={[styles.textButton,{color:"#6d6a6a"}]}>Adicionado</Text>
                            </TouchableOpacity>

                        </View>
                    </>
                )}
                        
                
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

       </View>
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
        opacity:0.1,
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
        height:40,
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
        height:60

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