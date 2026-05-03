

import { StyleSheet, Text, View } from 'react-native';
import ButtonD from './Src/Components/ButtonDefault';
import InputD from './Src/Components/InputDefault';



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <ButtonD />
      <InputD/>
    </View>
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
