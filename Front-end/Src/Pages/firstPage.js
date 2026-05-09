
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-web';
import ButtonD from '../Components/ButtonDefault';




export default function FirstPage({navigation}) {

     

  return (
  
        <ScrollView style={styles.container}>
        
            {/*Icon */}
            <View style={styles.icon}>
                <MaterialCommunityIcons name="movie-open-play-outline" size={55} color="#fff" />
            </View>

            {/*Title*/}
            <View style={styles.Viewtitle}>
                <Text style={styles.title}>Encontre o que</Text>
                <Text style={[styles.title, {color:'#4f39f6'}]}>Assistir hoje.</Text>
            </View>
            {/*SubTitle*/}
            <View style={styles.Viewsubtitle}>
                <Text style={styles.subtitle}>Descubra em qual plataforma de streaming</Text>
                <Text style={styles.subtitle}>o seu filme ou série favorita está</Text>
                <Text style={styles.subtitle}>disponível, tudo em um só lugar</Text>
            </View>

            <ButtonD onpress={()=>navigation.navigate("Register")}/>
            <ButtonD text='Já tenho uma conta' color='#0F172B' onpress={()=>navigation.navigate("Login")}/>

        </ScrollView>
   
    
  );
}

const styles = StyleSheet.create({
  container: {  
    flex:1, 
    backgroundColor: '#020618',  
    
    
  },
  
  icon:{
    backgroundColor:'#4F39F6',
    padding:25,
    borderRadius:25,
    marginTop:200,
    width:'26%',
    alignSelf:'center',
    alignItems:'center'
  },
  title:{
    color:'#fff',
    fontSize:40,
    fontWeight:'bold'

  },
  Viewtitle:{
    alignItems:'center',
    marginTop:25,
  },
  subtitle:{
    color:'#fff',
    fontSize:19,
    textAlign:'center',
    marginBottom:6
  },
  Viewsubtitle:{    
    marginTop:20,
    marginBottom:20
  }

});