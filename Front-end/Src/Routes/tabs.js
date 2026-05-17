import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../Pages/home"
import Profile from "../Pages/profile"
import Interests from "../Pages/interests"
import Search from "../Pages/search"
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';


const TABS = createBottomTabNavigator()

export default function Tabs(){

    return(

        <TABS.Navigator 
            initialRouteName="Home"
            screenOptions={
                {
                    headerShown:false,
                    tabBarStyle:{backgroundColor:'#020618', height:90, borderTopColor:"#242425" }
                }}
            
        >

            <TABS.Screen name="Home" component={Home} 
                options={{
                    tabBarIcon:({focused})=>{
                        if(focused){
                            return <AntDesign name="home" size={30} color="blue" />
                        }
                        return <AntDesign name="home" size={30} color="#ffff" />
                    }
                }}
            />

             <TABS.Screen name="Buscar" component={Search}
                options={{
                    tabBarIcon:({focused})=>{
                        if(focused){
                            return <Feather name="search" size={30} color="blue" />
                        }

                        return <Feather name="search" size={30} color="#fff" />
                    }
                }}

            />

          
            <TABS.Screen name="Intereses" component={Interests}
                options={{
                    tabBarIcon:({focused})=>{
                        if(focused){
                            return <Feather name="heart" size={30} color="blue" />
                        }
                        return <Feather name="heart" size={30} color="#fff" />
                    }
                }}
            
            />
              <TABS.Screen name="Perfil" component={Profile}
                options={{
                        tabBarIcon:({focused})=>{
                            if(focused){
                                return <Feather name="user" size={30} color="blue" />
                            }
                            return <Feather name="user" size={30} color="#fff" />
                        }
                    }}
            />

           

        </TABS.Navigator>
    )
}