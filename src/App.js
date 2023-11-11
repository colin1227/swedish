import './App.css';
import { Alphabet } from './components/Alphabet';
import { Header } from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageStart, setPageStart] = useState(0);
  useEffect(() => {
    console.log(`pageStart: ${pageStart}`);
  },[pageStart]);
  return (
    <NavigationContainer>
     <div className="App">
       <Header setSearchTerm={setSearchTerm} pageStart={pageStart} setPageStart={setPageStart} />
      <Stack.Navigator>
      <Stack.Screen
        initialParams={{
          searchTerm,
          pageStart
        }}
        searchTerm={searchTerm}
        pageStart={pageStart}
        name={'Alphabet'}
        component={() => <Alphabet searchTerm={searchTerm} pageStart={pageStart} />} />
      </Stack.Navigator>
       <footer className='App-footer'>
       </footer>
     </div>
    </NavigationContainer>
  );
}

export default App;
