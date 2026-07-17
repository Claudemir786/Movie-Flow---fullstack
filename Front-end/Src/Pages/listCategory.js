import { Text, View,StyleSheet,TouchableOpacity,FlatList,ActivityIndicator,ScrollView, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { listCategorySelected } from "../service/moviesAndTv";


export default function ListCategory({navigation, route}){
    
    const [dataCategory,setDataCategory] = useState([]);
    const [loading,setLoading] = useState(true);

   //receber a categoria e o tipo serie/filme para saber o que vai ser exibido 
   useEffect(()=>{
    const {category,type} = route.params
    getmoviesTv(category,type);

   },[])

   
  async function getmoviesTv(category,type) {
    try {
        const result = await listCategorySelected(category,type);
        
        if(result){
            console.log("dados retornados com sucesso");
            
            //guarda os dados retornados da API
            setDataCategory(result);
            //seta o valor para cancelar o loading da tela
            setLoading(false);

        }else{
            console.log(result);
        }
        
    } catch (error) {
        console.error("Falha ao trazer dados da categoria selecionada");
    }
  }


   
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
            {/*Body */}
            <View style={styles.body}>

                <View style={styles.header}>
                    <Text style={styles.title}>Resultados encontrados</Text>
                </View>
                 
               {/*componente de loading que fica girando até carregar as informações */}
                {loading &&(
                    <>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator size={"large"} color={"#4F39F6"}/>
                        </View>
                    </>
                )}
                {/*renderiza os componentes*/}
                <FlatList
                        data={dataCategory}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=> <LIST movieTv={item}/>}
                        scrollEnabled={false}

                     contentContainerStyle={{
                        paddingBottom:"10%",
                    }}
                />
               
            </View>

           
            


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#020618'
    },
    body:{
        width:'90%',
        alignSelf:'center',
        marginBottom:"12%"
    },
    header:{
        marginTop:"18%",
        marginBottom:"10%"
    },
    title:{
        color:'#808180',
        fontSize:16,
        fontWeight:'500',
        textAlign:'center'
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