import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { SearchStreaming } from "../service/moviesAndTv.js";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';



export default function Tvmovie({navigation,route}){
    /*const[dataTvMovie,setDataTvMovie] = useState([])
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
*/
    

  
    return(
       <ScrollView style={styles.container}>
            
            {/*Imagem de fundo*/}
            <ImageBackground 
                 source={//require('../Assets/i554287.jpeg')
                    {uri:'https://image.tmdb.org/t/p/w500/zQ8AxTPiCiS5nnwXpwTBPBHSaa5.jpg'}
                    }
                    style={styles.backgroundImage}
                    imageStyle={styles.image}
                    
            >
            {/*baloes de filme,ano e classificação*/}
                <View style={styles.sectionInfo}>

                    <View style={styles.info}>
                        <Text style={styles.textInfo}>Filme</Text>
                    </View>

                    <View style={[styles.info,{backgroundColor:'#272939',flexDirection:'row'}]}>
                        <Feather name="calendar" size={20} color="#fff" />
                        <Text style={[styles.textInfo,{marginLeft:'5%'}]}>2024</Text>
                    </View>

                    <View style={[styles.info,{backgroundColor:'#372D19',flexDirection:'row'}]}>
                        <AntDesign name="star" size={20} color="#FDC700" />
                        <Text style={[styles.textInfo,{color:'#FDC700',marginLeft:'5%'}]}>8,5</Text>
                    </View>
                </View>

                {/*Titulo do filme ou serie*/}
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>Homem Aranha</Text>
                </View>

                {/*botão de adicionar aos intereses*/}
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.button}>
                        <Feather name="bookmark" size={25} color="black" />
                        <Text style={styles.textButton}>Adicionar aos interesses</Text>
                    </TouchableOpacity>

                </View>            
                
                {/*Sinopse */}
                <View style={styles.viewSinopse}>
                    <Text style={styles.textSinopse}>Peter Parker é um jovem estudioso que vive com seus tios, Ben e May, desde que seus pais faleceram. Peter tem dificuldade em se relacionar com seus colegas, por ser tímido e por eles o considerarem um nerd. Até que, em uma demonstração científica, um acidente inesperado faz com que uma aranha modificada geneticamente pique Peter. A partir de então seu corpo é quimicamente alterado pela picada da aranha</Text>
                </View>

            </ImageBackground>
            
            {/*titulo de plataformas disponiveis*/}
            <View style={styles.subtitle}>
                <Feather name="play-circle" size={45} color="#4F39F6" />
                <Text style={styles.TextSubTitlePlataforms}>Disponível em</Text>
            </View>

            {/*plataformas disponiveis*/}
            <View style={styles.plataforms}>

                <View style={styles.card}>
                    
                    <View style={styles.sectionCard}>
                        <Text style={{color:'#fff', fontSize:23}}>Texto de plataforma</Text>
                        <Text style={{fontSize:18,color:'#808180', marginTop:'2%'}}>Plataforma</Text>
                    </View>
                </View>                  
                

            </View>

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
        marginTop:'5%',
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
        fontSize:15
    }

})