import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import InputD from "../Components/InputDefault";
import ButtonD from "../Components/ButtonDefault";
import { useState } from "react";
import { alterEmailName, deleteAccount } from "../service/user";
import { logout } from "../service/secureStore";




export default function AccountDetails({navigation}){       
   const [name,setName] = useState("");
   const [email,setEmail] = useState("");
   const [correct, setCorrect] = useState(true);
   const [messageDeleteAccount, setMessageDeleteAccount] = useState(false);
   const [confirmDelete, setConfirmDelete] = useState(false);

    //logica de campos vazios e campos preenchidos
    async function changeNameEmail(){
        try {
            //regex que veirica se a senha corresponde as regras
            const isNameCorrect = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,100}$/.test(name);
            const isEmailCorrect = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            //se enviar somente o email para alteração
            if(!name && email){
                if(!isEmailCorrect){
                    setCorrect(false);
                }
                userService(name,email);

             //se enviar apenas o nome para alteração   
            }else if(name && !email){
                if(!isNameCorrect || name.length <= 2 || name.length >= 100){
                    setCorrect(false)
                }
                 userService(name,email)
            
            //se enviar nome e email corretamente    
            }else if(name && email){
                if(!isNameCorrect || !isEmailCorrect || name.length <= 2 || name.length >= 100){
                    setCorrect(false)
                }
                 userService(name,email)
            }
           
            
        } catch (error) {
            console.error("falha ao mudar os email ou nome");
        }
    }

    //função de ligação com o service onde se faz a conexão com a API
    async function userService(name,email){
        try {
            console.log(`dados estão corretos, email recebido :${email} e nome recebido ${name}`);
                const result = await alterEmailName(name,email);

                if(result){

                    console.log("dados alterados com sucesso")

                }else{
                    setCorrect(false);
                }
        } catch (error) {
            console.error("falha ao mudar os email ou nome");
        }

        
    }

    function confirmDeleteAccount(state){
       try {
        if(state){
            setMessageDeleteAccount(true);
        }else{
            setMessageDeleteAccount(false);
        }
        
        
       } catch (error) {
        console.error("falha na confirmação de exibição de menssagem de deletar conta");
       }
    }

    async function handleDeleteAccount(){
        try {
           console.log("consirmado que o usuário deseja deletar");
           
            const result = await deleteAccount();

            if(result){

                alert("conta excluída com sucesso");

                await logout();

                //reseta a navegação e volta para a primeira tela do app
                navigation.reset({
                    index: 0,
                    routes: [{name:"FirstPage"}]
                });
            }else{
                console.log("não foi possível excluir a conta corretamente");

            }
            
        } catch (error) {
            console.error("falha ao deletar a conta do usuário");
        }
    }

    return(
        <ScrollView style={styles.container}>
            {/*Cabeçalho*/}
            <View style={styles.header}>
                
                <View style={styles.user}>
                    <Feather name="user" size={70} color="#ffffff80" />
                </View>                              

            </View>

            {/*Corpo*/}
            <View style={styles.body}>
                <InputD label="Nome de exibição" value={name} placeholder="nome" onChange={setName} />
                {/*usado apenas para gerar espaço entre os componentes */}
                <View style={{marginTop:'5%'}}></View>
                <InputD label="Endereço de E-mail" value={email} placeholder="email" onChange={setEmail} />
                
                {/*usado apenas para gerar espaço entre os componentes */}
                <View style={{marginTop:'5%'}}></View>
                <ButtonD text="Salvar Alterações" onpress={changeNameEmail}/>                
                {!correct &&(
                    <>
                     <Text style={styles.textError}>
                       email ou nome incorreto, insira dados válidos 
                     </Text>
                    </>
                )}                
                              
            </View>

               
            <Modal visible={messageDeleteAccount} transparent={true} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={{color:"#fff", fontSize:30, textAlign:'center', fontWeight:'400'}}>Tem certeza que deseja excluir a sua conta?</Text>
                        <ButtonD text="Sim" color="#1C0F20" textColor={"#D85869"} onpress={handleDeleteAccount}/>                          
                        <ButtonD text="Não" onpress={()=>confirmDeleteAccount(false)}/>                          
                    </View>
                    
                </View>          

            </Modal>                                              

            {/*Rodapé*/}
            <View style={styles.footer}>
                <Text style={styles.textDelete}>Ao excluir sua conta, todos os seus dados e interesses salvos serão perdidos permanentemente</Text>
                <ButtonD text="Excluir Conta" color="#1C0F20" textColor={"#D85869"} onpress={()=>confirmDeleteAccount(true)}/>
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
        alignItems:'center',
        marginTop:'20%',
        marginBottom:'15%'
    },
    body:{

    },
    footer:{
        marginTop:'15%',
        
    },
    user:{
        backgroundColor:'#4F39F6',
        padding:10,
        borderRadius:60,    
    },
    textDelete:{
        color:'#808180',
        fontSize:16,
        fontWeight:'500',
        width:'90%',
        alignSelf:'center',
        
    },
    textError:{
        color:"#D85869",
        textAlign:'center',
        fontSize:18,
        marginTop:"5%"
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