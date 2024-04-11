import './App.css';
import { Alphabet } from './components/Alphabet';
import Notes from './components/Notes';
import { Header } from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { AlphabetREAL } from './components/AlphabetREAL';

const Stack = createNativeStackNavigator();

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageStart, setPageStart] = useState(0);
  const [isStrict, setIsStrict] = useState(false);
  useEffect(() => {
    console.log(`pageStart: ${pageStart}`);
  }, [pageStart]);
  return (
    <NavigationContainer>
      <div className="App">
        <Header
          isStrict={isStrict}
          pageStart={pageStart}
          setIsStrict={setIsStrict}
          setSearchTerm={setSearchTerm}
          setPageStart={setPageStart} />
        <Stack.Navigator initialRouteName='AlphabetREAL'>
          <Stack.Screen
            name={'Alphabet'}
            initialParams={{
              searchTerm,
              pageStart
            }}
            searchTerm={searchTerm}
            pageStart={pageStart}
            component={() => Alphabet({ isStrict, searchTerm, pageStart })} />

          <Stack.Screen
            name={'Notes'}
            initialParams={{
              searchTerm,
            }}
            component={() => Notes({ wordIndex: 12000 })} />
          <Stack.Screen
            name={'AlphabetREAL'}
            component={() => AlphabetREAL()} />
        </Stack.Navigator>
        <footer className='App-footer'>
        </footer>
      </div>
    </NavigationContainer>
  );
}

export default App;
