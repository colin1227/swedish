import './App.css';
import { WordsIGot } from './components/WordsIGot';
import Notes from './components/Notes';
import { Header } from './components/Header';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { AlphabetREAL } from './components/AlphabetREAL';

const Stack = createNativeStackNavigator();

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageStart, setPageStart] = useState(0);
  const [wordIndex, setWordIndex] = useState(964);
  const [isStrict, setIsStrict] = useState(false);
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  useEffect(() => {
    console.log(`pageStart: ${pageStart}`);
  }, [pageStart]);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const r = navigationRef.current.getCurrentRoute().name;
        console.log('routeNameRef onReady:', r)
        routeNameRef.current = r;
      }}
    >
      <Header
        routeNameRef={routeNameRef}
        navigationRef={navigationRef}
        isStrict={isStrict}
        pageStart={pageStart}
        wordIndex={wordIndex}
        setIsStrict={setIsStrict}
        setSearchTerm={setSearchTerm}
        setPageStart={setPageStart}
        setWordIndex={setWordIndex}
      />
      <div className="App">
        <Stack.Navigator
          initialRouteName='Notes'>
          <Stack.Screen
            name={'Words'}
            initialParams={{
              searchTerm,
              pageStart
            }}
            searchTerm={searchTerm}
            pageStart={pageStart}
            children={() => <Alphabet
              isStrict={isStrict}
              searchTerm={searchTerm}
              pageStart={pageStart}
              setWordIndex={setWordIndex}
            />} />
          <Stack.Screen
            name={'Notes'}
            initialParams={{
              searchTerm,
            }}
            // pass setSearchTerm in here to later look for other words to take notes on
            component={() => Notes({ wordIndex: 12000 })} />
          <Stack.Screen
            name={'Alphabet'}
            component={() => AlphabetREAL()} />
        </Stack.Navigator>
      </div>
    </NavigationContainer>
  );
}

export default App;
