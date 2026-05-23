
import { Text,View, TouchableOpacity, StyleSheet, ScrollView, TextInput} from "react-native"
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Search(){

    return(
       <ScrollView style={styles.container}>
        
        {/*Cabeçalho com a barra de pesquisa */}
        <View style={styles.header}>
            <View style={styles.inputView}>
                <View style={{padding:10}}>

                    <Feather name="search" size={25} color="#7B837E" />
                </View>
                
                 <TextInput
                style={styles.input}
                placeholder="Buscar títulos"
                onSubmitEditing={()=>{console.log("Clicou e deu enter")}}
                
                />

            </View>
           

        </View>

        {/*buscar filmes por genero */}
        <View style={styles.movieView}>
            <View style={{flexDirection:'row'}}>
                <MaterialIcons name="movie" size={35} color="#7B837E" />  
                <Text style={styles.title}>CATEGORIAS FILMES</Text>
            </View>

            {/*botões */}
            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly'}}>
                <TouchableOpacity style={styles.buttonCategoryMovie}>
                    <Text style={styles.textButton}>Ação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategoryMovie}>
                    <Text style={styles.textButton}>Comédia</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategoryMovie}>
                    <Text style={styles.textButton}>Terror</Text>
                </TouchableOpacity>               
            </View>
            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly', marginTop:'5%'}}>
                <TouchableOpacity style={styles.buttonCategoryMovie}>
                    <Text style={styles.textButton}>Romance</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategoryMovie}>
                    <Text style={styles.textButton}>Ficção Científica</Text>
                </TouchableOpacity>    

            </View>
        </View>

        {/*buscar series por genero */}
        <View style={styles.movieView}>

           <View style={{flexDirection:'row'}}>
                <Feather name="tv" size={32} color="#7B837E" />
                <Text style={styles.title}>CATEGORIAS SÉRIES</Text>
            </View>

             {/*botões */}
            <View>
                 <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly'}}>
                <TouchableOpacity style={styles.buttonCategorySerie}>
                    <Text style={styles.textButton}>Ação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategorySerie}>
                    <Text style={styles.textButton}>Comédia</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategorySerie}>
                    <Text style={styles.textButton}>Terror</Text>
                </TouchableOpacity>               
            </View>
            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly', marginTop:'5%'}}>
                <TouchableOpacity style={styles.buttonCategorySerie}>
                    <Text style={styles.textButton}>Romance</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategorySerie}>
                    <Text style={styles.textButton}>Ficção Científica</Text>
                </TouchableOpacity>                
            </View>

            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-evenly', marginTop:'5%'}} >
                <TouchableOpacity style={styles.buttonCategorySerie}>
                    <Text style={styles.textButton}>Reality</Text>
                </TouchableOpacity>  

                 <TouchableOpacity style={styles.buttonCategorySerie}>
                    <Text style={styles.textButton}>Kids</Text>
                </TouchableOpacity>  

            </View>
            

            </View>
        </View>

       </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#020618',
        flex:1
    },
    header:{
        borderWidth:1,
        borderBlockColor:'#7B837E',


    },
    inputView:{
        backgroundColor:'#0F172B',
        borderRadius:15,
        width:'90%',
        alignSelf:'center',
        flexDirection:'row',
        marginTop:'17%',
        borderWidth:1,
        borderColor:'#7B837E',
        marginBottom:'10%'
        
    },
    input:{
        backgroundColor:'#0F172B',
        color:'#7B837E',
        fontSize:20,
        marginLeft:"3%",
        width:'100%',
        padding:10,
        borderRadius:15,
        borderColor:'transparent',
        outlineStyle:'none'

        
    },
    movieView:{
        width:'90%',
        alignSelf:'center',
        marginTop:'10%',
       

    },
    buttonCategoryMovie:{
        backgroundColor:'#0F172B',
        padding:10,
        borderRadius:15,
        marginRight:'3%'
       
    },
    buttonCategorySerie:{
        backgroundColor:'#0C0E30',
        padding:10,
        borderRadius:15,
        marginRight:'3%'

    },
    title:{
        color:'#7B837E',
        fontSize:25,
        fontWeight:'600',
        marginLeft:'3%',
        marginBottom:"8%"
    },
    textButton:{
        color:"#fff",
        fontWeight:'600',
        fontSize:23
    }
})