import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import InputD from "../Components/InputDefault";
import ButtonD from "../Components/ButtonDefault";
import { useState } from "react";


export default function Login({navigation}){

    //guarda valores digitados nos inputs
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function handleLogin(){
        console.log(`dados que foram recebidos ${email} ${password}`)
        navigation.navigate("Home")
    }

    

    return(
        <ScrollView style={styles.container}>
            
            {/*logo do app */}
            <View style={styles.logo}>
                <MaterialCommunityIcons name="movie-open-play-outline" size={45} color="#4F39F6" />
                <Text style={styles.textLogo}>MovieFlow</Text>
            </View>

            {/*titulo e subtitulo */}
            <View style={styles.title}>
                <Text style={styles.textTitle}>
                    Bem-vindo de volta!
                </Text>
                <Text style={styles.subTitle}>
                    Faça login para continuar sua jornada cinematografica
                </Text>        
            </View>

            {/*inputs */}
            <InputD placeholder="seu@email.com" label="E-mail" value={email} onChange={setEmail}/>
            <View style={{marginTop:30}}></View>
            <InputD placeholder="******" passaword={true} label="Senha" value={password} onChange={setPassword}/>
            
            {/*esqueceu a senha */}
            <View style={styles.forgotPassword}>
                <TouchableOpacity style={styles.fgButton} onPress={()=>navigation.navigate("ForgotPass")}>
                    
                    <Text style={styles.fgText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>

            {/*botaão */}
            <ButtonD text="Entrar" onpress={handleLogin}/>


            {/*direciona pora o registro */}
            <View style={styles.register}>
                <Text style={styles.textRegister}>Ainda não tem uma conta?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                    <Text style={styles.registerButton}> Cadastre-se</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#020618'
    },
    logo:{
        marginTop:'35%',
        flexDirection:'row',
        justifyContent:'center'
    },
    textLogo:{
        color:"#fff",
        alignSelf:'center',
        fontSize:30,
        marginLeft:"3%",
        fontWeight:'700'
    },
    textTitle:{
        color:'#fff',
        fontSize:30,
        fontWeight:'800'

    },
    subTitle:{
        color:'#878a95',
        fontSize:20,
        marginTop:10

    },
    title:{
      width:'90%',
      alignSelf:'center',
      marginTop:'10%',
      marginBottom:'10%'

    },
    forgotPassword:{
        flexDirection:'row',
        justifyContent:'flex-end',
        width:'90%',
        marginTop:15,
        marginBottom:28

    },
    
    fgText:{
        color:'#4F39F6',
        fontSize:18
    },
    register:{
        flexDirection:'row',
        marginTop:30,
        width:'90%',
        justifyContent:'center',
        alignSelf:'center',
        marginBottom:"30%"
    },    
    textRegister:{
        color:'#878a95',
        fontSize:17
    },
    registerButton:{
        color:'#4f39f6',
        fontSize:17
    }
})