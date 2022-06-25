import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Home from './src/screens/Home';
import { AppProvider } from './src/context/AppContext';
import Navigation from './src/screens/Navigation';
export default function App() {
  return (
    <View style={{ flex: 1, marginTop: Platform.OS==='ios'?20:StatusBar.currentHeight }}>
      <StatusBar backgroundColor="#e8e9f5" translucent={false} barStyle="dark-content"/>
      <AppProvider>
        <Navigation/>
      </AppProvider>
    </View>
  );
}
