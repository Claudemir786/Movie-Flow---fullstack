import { Text, View } from "react-native";
import { useEffect, useState } from "react";


export default function ListCategoty({navigation, route}){
   
   //receber a categoria e o tipo serie/filme para saber o que vai ser exibido 
   const {category,type} = route.params
  
   

    return(
        <View>
            <Text>CATEGORIA QUE VEIO RECEBIDA {category} e tipo {type} </Text>
            
        </View>
    )
}