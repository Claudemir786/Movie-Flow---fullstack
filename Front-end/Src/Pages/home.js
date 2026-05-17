import { Text, StyleSheet,View, ScrollView, TextInput, ImageBackground, TouchableOpacity } from "react-native";


export default function Home({navigation}){

    //retorna a lista de filmes e séries
    const LIST = ()=>{

        return(
            <TouchableOpacity>
                <ImageBackground
                    source={require('../Assets/i554287.jpeg')}
                    style={styles.card}
                    imageStyle={styles.image}
                >
                <Text style={styles.textCard}>titulo</Text>

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
                />
            </View>

            {/*populares na região*/}
            <Text style={[styles.title, {fontSize:23, width:'90%', alignSelf:'center'}]}>
                    Populares na sua região
            </Text>
            
            <View style={styles.body}>              

                {/*card*/}
              <ImageBackground 
                source={require('../Assets/images.jpeg')}
                style={styles.card}
                imageStyle={styles.image}
              >

              </ImageBackground>

              <TouchableOpacity>
                <ImageBackground
                    source={require('../Assets/i554287.jpeg')}
                    style={styles.card}
                    imageStyle={styles.image}
                >
                <Text style={styles.textCard}>The Batman</Text>
              </ImageBackground>
              </TouchableOpacity>
             
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
        fontSize:28
    },
    subTitle:{
        color:'#878a95',
        fontSize:20
    },
    viewSearch:{
        width:'90%',
        alignSelf:'center',
        marginBottom:'10%'
    
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
        marginTop:'10%',     
       

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