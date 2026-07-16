import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from "react";
import { allUserIntrests } from "../service/moviesAndTv";


export default function Interests({navigation}){
    const [dataMoviesTv,setDataMoviesTv] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        getMyMoviesTv();
    },[])

   
    //função que busca os dados;
    async function getMyMoviesTv(params){
        try {

            const result = await allUserIntrests();
            //console.log("daddos que retornaram: ", result);

            if(result){
                setDataMoviesTv(result);
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
                    {movieTv.name &&(
                        <Text style={styles.textCard}>{movieTv.name}</Text>
                    )}
    
                    </ImageBackground>
    
    
                </TouchableOpacity>
            )}

    return(
       <View style={styles.container}>

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
            data={dataMoviesTv}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=> <LIST movieTv={item} />}
        />
       

        </View>

       </View>
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