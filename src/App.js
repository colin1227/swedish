import './App.css';
import { Alphabet } from './components/Alphabet';
import Notes from './components/Notes';
import { Header } from './components/Header';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageStart, setPageStart] = useState(0);
  const [wordIndex, setWordIndex] = useState(-1);
  const [isStrict, setIsStrict] = useState(false);
  useEffect(() => {
    console.log(`pageStart: ${pageStart}`);
  }, [pageStart]);
  return (
    <NavigationContainer>
      <Header
          isStrict={isStrict}
          pageStart={pageStart}
          setIsStrict={setIsStrict}
          setSearchTerm={setSearchTerm}
          setPageStart={setPageStart} />
      <div className="App">
        <Stack.Navigator
          initialRouteName='Alphabet'>
          <Stack.Screen
            initialParams={{
              searchTerm,
              pageStart
            }}
            searchTerm={searchTerm}
            pageStart={pageStart}
            name={'Alphabet'}
            children={() => <Alphabet
              isStrict={isStrict}
              searchTerm={searchTerm}
              pageStart={pageStart}
              setWordIndex={setWordIndex}
            />} />
          <Stack.Screen
            name='Notes'
            initialParams={{
              searchTerm,
            }}
            component={() => <Notes
              wordIndex={wordIndex}
              searchTerm={searchTerm}
              setWordIndex={setWordIndex}
              />} />
        </Stack.Navigator>
      </div>
    </NavigationContainer>
  );
}

export default App;
