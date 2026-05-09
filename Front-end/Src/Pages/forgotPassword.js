import { View, Text, StyleSheet } from "react-native"
import InputD from "../Components/InputDefault"
import ButtonD from "../Components/ButtonDefault"



export default function ForgotPass({navigation}){

    return(
        <View style={styles.container}>
           
        {/*Titulo e subtitulo */}
        <View style={styles.viewTitle}>
            <Text style={styles.title}>Esqueceu a senha?</Text>
            <Text style={styles.subTitle}>Digite seu e-mail abaixo e enviaremos um codigo para você redefinir sua senha</Text>
        </View>

        {/*input */}
        <InputD label="E-mail cadastrado" placeholder="seu@email.com"/>

        <View style={{marginTop:20}}></View>

        {/*botão*/}
        <ButtonD text="Enviar "/>

        </View>
    )
} 


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#020618',
        
    },
    title:{
        color:'#fff',
        fontSize:30,
        fontWeight:'600',
        marginBottom:10
    },
    subTitle:{
        color:"#878a95",
        fontSize:17
    },
    viewTitle:{
        width:'90%',
        alignSelf:'center',
        marginTop:'60%',
        marginBottom:35
        
        
    }
})