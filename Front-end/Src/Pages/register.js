import{Text,View,StyleSheet, TouchableOpacity, ScrollView} from  'react-native'
import InputD from '../Components/InputDefault'
import ButtonD from '../Components/ButtonDefault'
import { useState } from 'react'


export default function Register({navigation}){

    //guarda as informações digitadas nos inputs
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")


    //função chama ao clicar no botão
    function handleCreate(){
        console.log(`Dados que chegaram após clicar no botão, Email: ${email} Nome: ${name}, senha: ${password}`)
        navigation.navigate("Login")
    }


    return(
        <ScrollView style={styles.container}>
            
            {/*title */}
            <View style={styles.viewTitle}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subTitle}>Junte-se a nós para descobrir onde assistir seus filmes e séries favoritos</Text>
            </View>

            {/*Campos de input */}
            <InputD value={name} onChange={setName}/>
            <View style={styles.margin}></View>{/*margin de espaço entre os componentes */}
            <InputD placeholder='seu@email.com' label='E-mail' value={email} onChange={setEmail}/>
            <View style={styles.margin}></View>
            <InputD placeholder='Crie uma senha forte' label='Senha' passaword={true} value={password} onChange={setPassword}/>
            <View style={styles.margin}></View>           

            <ButtonD text='Criar conta' onpress={handleCreate}/>

            <View style={styles.margin}></View>

            {/*Ir para o login */}
            <View style={styles.redirect}>

                <Text style={styles.text}>Já tem uma conta?</Text>
                <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate("Login")}>
                    <Text style={styles.textTouch}> Fazer login</Text>
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
    viewTitle:{
        marginBottom:"12%"
    },
    title:{
        color:"#fff",
        marginTop:'30%',
        fontSize:30,        
        marginLeft:'5%',
        fontWeight:'700',
        marginBottom:8
    },
    subTitle:{
        marginLeft:'5%',
        color:'#878a95',
        fontSize:19
    },
    redirect:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20,
        marginBottom:80  
        
    },
    touch:{
        
    },
    textTouch:{
        fontSize:20,
        color:'#4F39F6'
    },
    text:{
        fontSize:20,
        color:"#878a95"
    },
    margin:{
        marginBottom:15
    }
})