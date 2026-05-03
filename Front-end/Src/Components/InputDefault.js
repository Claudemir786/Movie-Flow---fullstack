import {View,Text,StyleSheet,TouchableOpacity, TextInput} from 'react-native'

export default function InputD({placeholder = 'Seu nome', label = 'Nome', passaword = false,value,onChange }){

    return(
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>{label}</Text>
            </View>
            
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                secureTextEntry={passaword}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        
    },
    textView:{
        width:'90%', 
        alignSelf:'center',
        marginBottom:8
    },
    text:{
        fontSize:23,
        color:'#878a95',
        fontWeight:'500',
        
    },
    input:{
        backgroundColor:'#0F172B',
        color:'#878A95',
        padding:25,
        fontSize:25,
        width:'90%',
        alignSelf:'center',
        borderRadius:15
    }
    
})