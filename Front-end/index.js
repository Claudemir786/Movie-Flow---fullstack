import { registerRootComponent } from 'expo';
import FirstPage from './Src/Pages/firstPage';
import Register from './Src/Pages/register';
import Login from './Src/Pages/login';
import App from './App';
import ForgotPass from './Src/Pages/forgotPassword';
import Home from './Src/Pages/home';
import Search from './Src/Pages/search';
import Interests from './Src/Pages/interests';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Interests);
