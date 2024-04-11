import './App.css';
import { WordsIGot } from './components/WordsIGot';
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
        <Stack.Navigator initialRouteName='Alphabet'>
          <Stack.Screen
            name={'Words'}
            initialParams={{
              searchTerm,
              pageStart
            }}
            searchTerm={searchTerm}
            pageStart={pageStart}
            component={() => WordsIGot({ isStrict, searchTerm, pageStart })} />

          <Stack.Screen
            name={'Notes'}
            initialParams={{
              searchTerm,
            }}
            component={() => Notes({ wordIndex: 12000 })} />
          <Stack.Screen
            name={'Alphabet'}
            component={() => AlphabetREAL()} />
        </Stack.Navigator>
        <footer className='App-footer'>
        </footer>
      </div>
    </NavigationContainer>
  );
}

export default App;
