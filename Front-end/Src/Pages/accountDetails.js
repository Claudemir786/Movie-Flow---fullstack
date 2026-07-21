import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import InputD from "../Components/InputDefault";
import ButtonD from "../Components/ButtonDefault";



export default function AccountDetails({navigation}){       
   

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
                <InputD label="Nome de exibição" />
                {/*usado apenas para gerar espaço entre os componentes */}
                <View style={{marginTop:'5%'}}></View>
                <InputD label="Endereço de E-mail" />
                
                {/*usado apenas para gerar espaço entre os componentes */}
                <View style={{marginTop:'5%'}}></View>
                <ButtonD text="Salvar Alterações"/>                
                                
            </View>

            {/*Rodapé*/}
            <View style={styles.footer}>
                <Text style={styles.textDelete}>Ao excluir sua conta, todos os seus dados e interesses salvos serão perdidos permanentemente</Text>
                <ButtonD text="Excluir Conta" color="#1C0F20" textColor={"#D85869"}/>
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
        
    }
   
})