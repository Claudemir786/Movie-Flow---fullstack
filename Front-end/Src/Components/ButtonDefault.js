import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { Button } from 'react-native-web'

export default function ButtonD({text = 'Começar agora >',color = '#4F39F6',onpress}){

    return(
        <View style={styles.container}>

            <TouchableOpacity 
            style={
                [styles.button, {backgroundColor:color}]}
                onPress={onpress}>

                    <Text style={styles.text}>{text}</Text>

            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{        
        width:'100%'      
    },
    text:{
        fontSize:27,
        color:"#fff",
        fontWeight:'500',
        textAlign:'center'
    },
    button:{
      borderRadius:15,
      padding:25,
      marginTop:20,
      alignSelf:'center',
      width:'90%', 

    }

})