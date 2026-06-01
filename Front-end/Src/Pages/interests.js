import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native"
import Feather from '@expo/vector-icons/Feather';


export default function Interests(){

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
            {/*apenas um teste de como vai aparecer*/}
            <TouchableOpacity>
                <ImageBackground
                    source={require('../Assets/i554287.jpeg')}
                    style={styles.card}
                    imageStyle={styles.image}
                >
                <Text style={styles.textCard}>titulo</Text>

                </ImageBackground>
        
        
            </TouchableOpacity>
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
        alignSelf:'center'

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
        opacity:'40%'       
        
    },
    textCard:{
        color:'#fff',
        
    }
})