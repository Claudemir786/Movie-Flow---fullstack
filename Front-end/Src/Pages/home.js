import { useEffect, useState } from "react";
import { Text, StyleSheet,View, ScrollView, TextInput, ImageBackground, TouchableOpacity, FlatList } from "react-native";
import { SearchFilmsTv, SearchMovieTv, Trending } from "../service/moviesAndTv.js";


export default function Home({navigation}){

    const [trending,setTrending] = useState([])
    const [titleMovieTv,setTitleMovieTv] = useState("")
    const [searchMovieTv,setSerchMovieTv] = useState([])
    const [searchActive,setSearchActive] = useState(false)

    //traz todos os filmes e series que estão em alta
    async function handleTrending(){
        try {            
            const result = await Trending()

            if(result){
                
                setTrending(result)
                //console.log("dados retornaram: ", result)

            }else{
                console.log("dados não retornaram: ", result)
               
            }

        } catch (error) {
            console.error("Falha ao trazer os dados para a pagina: ", error)
        }
    }

    //função que retorna dados de acordo com a pesquisa
    async function handleSearch() {       
       try {
            //chama a função que faz a conexão com a API
            const result = await SearchMovieTv(titleMovieTv)
            if(result){
                console.log("dados retornaram corretamente")
                //atualiza o valor da variavel para ser exibida
                setSerchMovieTv(result)
                setSearchActive(true)

            }else{
                console.warn("Dados não retornaram corretamente: ", result);
            }
            
        } catch (error) {
            console.error("falha ao buscar dados de pesquisa: ", error);
        }
    }

    //ja renderiza a tela chamando os dados 
    useEffect(()=>{
        handleTrending()
    },[]);


    //retorna a lista de filmes e séries
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
        )
    }

    return(
        <ScrollView style={styles.container}>

            {/*Titulo de boas vindas */}
            <View style={styles.viewTitle}>
                <Text style={styles.title}>Olá Visitante! 👋</Text>
                <Text style={styles.subTitle}>O que vamos assistir hoje?</Text>
            </View>

            {/*Campo de busca*/}
            <View style={styles.viewSearch}>
                
                <TextInput 
                    style={styles.search}
                    placeholder="Buscar filmes e séries"
                    onChangeText={setTitleMovieTv}
                    onSubmitEditing={()=>{handleSearch()}}
                />
            </View>


            <View style={styles.body}>              

            {/*card*/}
            {!searchActive &&(
                <>
                {/*populares na região*/}
                <Text style={styles.title }>
                        Populares na sua região
                </Text>
            
                <FlatList
                    data={trending}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=> <LIST movieTv={item}/>}
                
                />
                </>
             
            )}
            {searchActive &&(
                <>
                    {/*Resultado da pesquisa*/}
                    <Text style={styles.title}>
                            Resultados da pesquisa
                    </Text>
            
                    <FlatList
                        data={searchMovieTv}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=> <LIST movieTv={item}/>}
                    
                />
                </>
              
             
            )}

            
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#020618',
        
    

    },
    viewTitle:{
        marginTop:"15%",       
        marginBottom:'10%',
        width:'90%',
        alignSelf:'center'
    },
    title:{
        color:"#fff",
        fontSize:28,
        marginBottom:'5%'
    },
    subTitle:{
        color:'#878a95',
        fontSize:20
    },
    viewSearch:{
        width:'90%',
        alignSelf:'center',
        marginBottom:'5%'
    
    },
    search:{
        backgroundColor:'#0F172B',
        color:'#878a95',
        padding:25,
        borderRadius:15
    },
    body:{
        width:'90%',
        alignSelf:'center',
        marginTop:'5%',     
       

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
        opacity:'40%'       
        
    },
    textCard:{
        color:'#fff',
        
    }
})