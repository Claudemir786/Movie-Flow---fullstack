import { Text,View,StyleSheet,TouchableOpacity } from "react-native"
import Feather from '@expo/vector-icons/Feather';


export default function Profile({navigation}){

    return(
        <View style={styles.container}>
            
            {/*Cabeçalho */}
            <View style={styles.header}>
                {/*icone de perfil */}
                <View style={styles.user}>
                    <Feather name="user" size={70} color="#fff" />
                </View>

                {/*informações de nome e email de usuário*/}
                <View style={styles.ifoUser}>
                    <Text style={styles.nameUser}>Nome Usuário</Text>
                    <Text style={styles.emailUser}>Email do usuário</Text>
                </View>
            </View>

            {/*Corpo da pagina*/}
            <View style={styles.body}>

                <Text style={styles.title}>CONFIGURAÇÕES DA CONTA</Text>
                {/*Card com as opções sugeridas*/}
                <View style={styles.card}>
                    {/*Botões*/}
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("AccountDetails")}>
                        <View style={styles.buttonIcon}>
                            <Feather name="user" size={30} color="#ffffff80" />
                        </View>
                        <Text style={styles.titleButton}>Detalhes da Conta</Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("AccountSecurity")}>
                        <View style={styles.buttonIcon}>
                            <Feather name="shield" size={30} color="#ffffff7c" />
                        </View>
                        <Text style={styles.titleButton}>Privacidade e Segurança</Text>
                    </TouchableOpacity>
                        
                    <TouchableOpacity style={[styles.button,{borderColor:''}]} onPress={()=>navigation.navigate("HelpCenter")}>
                        <View style={styles.buttonIcon}>
                           <Feather name="help-circle" size={30} color="#ffffff7c" />
                        </View>
                         <Text style={styles.titleButton}>Central de Ajuda</Text>
                    </TouchableOpacity>

                </View>   

                {/*Botão de sair*/}
                <TouchableOpacity style={styles.logoout} onPress={()=>navigation.navigate("FirstPage")}>
                    <Feather name="log-out" size={30} color="#D85869" />
                    <Text style={styles.logooutText}>Sair da Conta</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#020618'
    },
    body:{
        width:'90%',
        alignSelf:'center',
        marginTop:'8%'
    },
    title:{
        color:'#808180',
        fontSize:17,
        fontWeight:'700'
    },
    header:{
        backgroundColor:"#080E22",
        flexDirection:'row',
        padding:40,
        borderBottomWidth:1,
        borderColor:'#333333'        
    },
    ifoUser:{
        flexDirection:'column',
        marginLeft:'8%',     
        marginTop:'8%' 
    },
    user:{
        backgroundColor:'#4F39F6', 
        borderRadius:60,
        padding:10,
        marginTop:'8%'       
        
    },
    nameUser:{
        color:'#dee0de',
        fontWeight:'600',
        fontSize:25,
        marginBottom:'5%'
    },
    emailUser:{
        color:'#808180',
        fontSize:15
    },
    card:{
        backgroundColor:'#0F172B',
        borderRadius:15,
        marginTop:"7%",
        borderColor:'#ffffff3a',
        borderWidth:1
    },
    buttonIcon:{
        backgroundColor:'#000',
        borderRadius:20,
        padding:10
    },
    button:{
        flexDirection:'row',
        padding:15,
        borderBottomWidth:1,
        borderColor:'#ffffff13'
    },
    titleButton:{
        fontSize:22,
        marginLeft:'5%',
        alignSelf:'center',
        fontWeight:'500',
        color:'#dee0de'
    },
    logoout:{
        backgroundColor:'#1C0F20',
        flexDirection:'row',
        marginTop:'15%',
        borderRadius:15,
        justifyContent:'center',
        padding:16,
        borderWidth:1,
        borderColor:'#d8586973'
    },
    logooutText:{
        color:'#D85869',
        fontSize:20,
        fontWeight:'700',
        marginLeft:'5%',

    }
})