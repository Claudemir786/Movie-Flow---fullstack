

import { StyleSheet, Text, View } from 'react-native';
import ButtonD from './Src/Components/ButtonDefault';
import InputD from './Src/Components/InputDefault';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './Src/Routes/stack';




export default function App() {
  return (
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
