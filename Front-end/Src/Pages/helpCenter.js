import { View, StyleSheet,Text,TouchableOpacity,ScrollView} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";

export default function HelpCenter({navigation}){

    const [opened,setOpened] = useState(false)
    const [opened2,setOpened2] = useState(false)
    const [opened3,setOpened3] = useState(false)
    const [opened4,setOpened4] = useState(false)


    const Card = ({title,description,open,setopen})=>{
        return(
            <View style={styles.card}>
                {/*Botão*/}    
                <TouchableOpacity style={styles.button} onPress={()=>setopen(!open)}>
                    <Text style={styles.textButton}>{title}</Text>
                    <Feather name="chevron-up" size={28} color="#fff" 
                    //acão de virar a seta
                    style={{
                        transform:[
                            {
                                rotate: open ? "180deg": "0deg"
                            }
                        ]
                    }}
                    />

                </TouchableOpacity>
                {/*se clicar na seta abre a caixa de descrição */}
                 {open && (
                        <View style={styles.viewDescription}>
                        <Text style={styles.description}>
                            {description}
                        </Text>
                        </View>
                    )}
            </View>
        )
    }
    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>DÚVIDAS FREQUENTES (FAQ)</Text>
            </View>
            {/*cards */}
            <Card setopen={setOpened} open={opened} title={"O Movie Flow é gratuito?"} description={"Sim! O StreamFind é 100% gratuito. Nós apenas ajudamos você a encontrar em quais plataformas de streaming (como Netflix, Prime Video, Max, etc) o seu filme ou série favorito está disponível. Você não paga nada para usar o nosso app."}/>
            <Card setopen={setOpened2} open={opened2} title={"Posso assistir aos filmes pelo app?"} description={"Não. Nós somos um guia e buscador. Nós mostramos onde o conteúdo está disponível, e você deve acessar a plataforma de streaming correspondente (como a Netflix) para assistir."}/>
            <Card setopen={setOpened3} open={opened3} title={"Como atualizo as minhas assinaturas?"} description={"Atualmente, esta funcionalidade está sendo remodelada para trazer uma experiência ainda mais simples. Em breve, novos ajustes poderão ser feitos no seu perfil."}/>
            <Card setopen={setOpened4} open={opened4} title={"Não encontrei um filme.O que eu faço?"} description={"Nosso banco de dados é atualizado diariamente. Se um título acabou de ser lançado no cinema, pode levar alguns dias para aparecer com as informações de streaming disponíveis."}/>
            
            <View style={{marginTop:'20%'}}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#020618'
    },
    header:{
        width:'90%',
        alignSelf:'center',
        marginTop:'25%',
        marginBottom:'3%'
    },
    title:{
        color:'#808180',
        fontSize:22,
        fontWeight:'bold'
    },
    card:{
        backgroundColor:'#0F172B',
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
        marginBottom:'6%'
    },
    button:{
        flexDirection:'row',
        width:'90%',
        alignSelf:'center',
        justifyContent:'space-between',
        marginBottom:'5%',
        marginTop:'5%'
        
    },
    textButton:{
        color:'#fff',
        fontSize:22
    },
    description:{
        color:'#808180',
        fontSize:20,
        
    },
    viewDescription:{
        width:'90%', 
        alignSelf:'center',
        borderTopWidth:1,
        borderColor:'#80818059',
        marginBottom:'5%',
        
    }
    
})



//Posso assistir aos filmes pelo app?
/*Não. Nós somos um guia e buscador. Nós mostramos onde o conteúdo está disponível, e você deve acessar a plataforma de streaming correspondente (como a Netflix) para assistir. */

//Como atualizo as minhas assinaturas?
/*Atualmente, esta funcionalidade está sendo remodelada para trazer uma experiência ainda mais simples. Em breve, novos ajustes poderão ser feitos no seu perfil. */

//Não encontrei um filme.O que eu faço?
/*Nosso banco de dados é atualizado diariamente. Se um título acabou de ser lançado no cinema, pode levar alguns dias para aparecer com as informações de streaming disponíveis. */
//<Feather name="chevron-down" size={24} color="black" />