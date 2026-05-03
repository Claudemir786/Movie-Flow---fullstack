import{Text,View,StyleSheet, TouchableOpacity} from  'react-native'
import InputD from '../Components/InputDefault'
import ButtonD from '../Components/ButtonDefault'


export default function Register(){

    return(
        <View style={styles.container}>
            
            {/*title */}
            <View style={styles.viewTitle}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subTitle}>Junte-se a nós para descobrir onde assistir seus filmes e séries favoritos</Text>
            </View>

            {/*Campos de input */}
            <InputD/>
            <InputD placeholder='seu@email.com' label='E-mail'/>
            <InputD placeholder='Crie uma senha forte' label='Senha' passaword={true}/>

            <View></View>

            <ButtonD text='Criar conta'/>

            <View></View>

            {/*Ir para o login */}
            <View style={styles.redrect}>

                <Text style={styles.text}>Já tem uma conta?</Text>
                <TouchableOpacity style={styles.touch}>
                    <Text style={styles.textTouch}>Fazer login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#020618',
        flex:1,
    },
    viewTitle:{

    },
    title:{
        color:"#fff",
        marginTop:'30%',
        fontSize:30,        
        marginLeft:'5%',
        fontWeight:'700'
    },
    subTitle:{
        marginLeft:'5%',
        color:'#fff',
        fontSize:19
    },
    redrect:{

    },
    touch:{

    },
    textTouch:{

    },
    text:{

    }
})