import { registerRootComponent } from 'expo';
import FirstPage from './Src/Pages/firstPage';
import Register from './Src/Pages/register';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Register);
