import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Pages/login";
import Home from "../Pages/home";
import Register from "../Pages/register";
import FirstPage from "../Pages/firstPage";
import ForgotPass from "../Pages/forgotPassword";
import Tabs from "./tabs";
import ListCategoty from "../Pages/listCategory";


const STACK = createNativeStackNavigator()


export default function Stack(){

   return(
        <STACK.Navigator initialRouteName="FirstPage" screenOptions={{headerShown:false}}>

            <STACK.Screen name="Login" component={Login}/>
            <STACK.Screen name="Tabs" component={Tabs}/>
            <STACK.Screen name="Register" component={Register}/>
            <STACK.Screen name="FirstPage" component={FirstPage}/>
            <STACK.Screen name="ForgotPass" component={ForgotPass}/>
            <STACK.Screen name="ListCategory" component={ListCategoty}/>
            
            

        </STACK.Navigator>
   )
}