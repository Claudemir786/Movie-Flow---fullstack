import { View,ScrollView,Text,TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { Switch } from "react-native";
import { useState } from "react";
import InputD from "../Components/InputDefault";
import ButtonD from "../Components/ButtonDefault";

export default function AccountSecurity({navigation}){

    const [active,setActive] = useState(false)
    const [activeData, setActiveData] = useState(false)
    const [alterPass, setAlterPass] = useState(false)
    const [password,setPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")

    function handlePassword(){
        alert("Senha alterada com sucesso")
        setAlterPass(false)
    }

   
    return(
        <ScrollView style={styles.container}>

        {/*titulo do primeiro card */}
        <View style={styles.firstTitleCard}>
            <Feather name="shield" size={40} color="#4F39F6" />
            <Text  style={styles.titleCard}>Segurança da Conta</Text>
        </View>

        {/*primeiro card */}
        <View style={styles.card}>

            {/*alterar senha */}
            <View style={styles.option}>

                {/*icone de senha */}
                <View style={styles.icon}><Feather name="key" size={25} color="#fff" /></View>
                <Text style={styles.titleKey}>Alterar Senha</Text>
                <TouchableOpacity style={styles.button} onPress={()=>setAlterPass(true)}>
                    <Text style={{fontSize:20,color:'#4F39F6'}}>Alterar</Text>
                </TouchableOpacity>
              
            </View>

            {/*View utilizada apenas para criar um linha entre as opções*/}
            <View style={{ borderBottomWidth:1, borderColor:'#ffffff28'}}></View>

            {/*Autenticação em 2 Fatores*/}
            <View style={styles.option}>
                
                {/*Icone de autenticação*/}
                <View style={styles.icon}><Feather name="smartphone" size={25} color="#fff" /></View>
                <Text style={styles.titleKey}>Autenticação em 2 Fatores</Text>
                {/*botão de ativar e desativar */}
                <Switch
                    value={active}
                    onValueChange={setActive}
                    trackColor={{
                        false:'#808180',
                        true:'#4F39F6'
                    }}
                    thumbColor='#ffff'
                    style={styles.button}
                />

            </View>

        </View>
            {/*tela de pop-pup quando clica em alterar senha */}
            <Modal visible={alterPass} transparent={true} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <InputD label="digite a senha atual" placeholder="*******" passaword={true} value={password} onChange={setPassword}/>            
                        <InputD label="digite a nova senha" placeholder="*******" passaword={true} value={newPassword} onChange={setNewPassword}/>
                        <ButtonD text="Enviar" onpress={()=>handlePassword()}/>                          
                    </View>
                    
                </View>                  
                    
            </Modal>
          

        {/*Titulo do segundo card */}
         <View style={styles.secondTitleCard}>
            <Feather name="eye-off" size={40} color="#4F39F6" />
            <Text style={styles.titleCard}>Privacidade de Dados</Text>

        </View>
        
         {/*segundo card */}
        <View style={styles.card}>
            <View style={styles.secondCard}>

                <Text style={[styles.titleKey, {marginLeft:0}]}>Coleta de Dados de Uso</Text>
                 {/*botão de ativar e desativar */}
                <Switch
                    value={activeData}
                    onValueChange={setActiveData}
                    trackColor={{
                        false:'#808180',
                        true:'#4F39F6'
                    }}
                    thumbColor='#ffff'
                    style={styles.button}
                />

            </View>
            <Text style={styles.description}>
                Permitir que coletamos dados anônimos sobre como você usa o aplicativo para melhorarmos nossas recomendações e interface
            </Text>
        </View>

        

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#020618'
    },
    titleCard:{
        color:'#fff',
        fontSize:23,
        alignSelf:'center',
        marginLeft:'5%'
    },
    firstTitleCard:{
        flexDirection:'row',
        marginTop:"20%",
        width:'90%',
        alignSelf:'center'

    },
    card:{
        backgroundColor:'#0F172B',
        width:'90%',
        alignSelf:'center',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#ffffff28',
        marginTop:'8%'
    },
    option:{
        width:'90%',
        alignSelf:'center',
        flexDirection:'row',
        marginTop:'5%', 
        marginBottom:'5%'    

    },
    icon:{
        backgroundColor:'#020618',
        borderRadius:15,
        padding:15
    },
    titleKey:{
        fontSize:22,
        color:'#fff',
        fontWeight:'600',
        marginLeft:'5%',
        alignSelf:'center'
    },
    button:{
        marginLeft:'18%',
        alignSelf:'center'
    },
    secondTitleCard:{
        flexDirection:'row',
        marginTop:"10%",
        width:'90%',
        alignSelf:'center'
    },
    description:{
        color:'#ffffff52',
        fontSize:18,
        marginTop:'5%',
        width:'90%',        
        alignSelf:'center',
        marginBottom:'5%'
    },
    secondCard:{
        flexDirection:'row',        
        marginTop:'5%',
        width:'90%',
        alignSelf:'center'
        
    },
    overlay: {
        flex: 1,
        backgroundColor: '#ffffff25',
        justifyContent: 'center',
        alignItems: 'center',
  },

    modal: {
        width: '90%',
        backgroundColor: '#0F172B',
        padding: 20,
        borderRadius: 15,
  },
   
})
   