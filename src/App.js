import './App.css';
import { Alphabet } from './screens/Alphabet';
import { AlphabetREAL } from './components/AlphabetREAL'
// import { WordsIGot } from './components/WordsIGot';
import { Header } from './components/Header';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'; // { useIsFocused }
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
// import { indexBuffer } from './helper';
import Notes from './components/Notes';

const Stack = createNativeStackNavigator();

function App() {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  const [searchTerm, setSearchTerm] = useState('');
  const [pageStart, setPageStart] = useState(0);
  const [isStrict, setIsStrict] = useState(false);
  const [page, setPage] = useState('');
  const [wordIndex, setWordIndex] = useState(0);

  function navigate(name, params) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  }

  // useEffect(() => {
  //   console.log(`pageStart: ${pageStart}`);
  // }, [pageStart]);

  useEffect(() => {
    console.log('navigationRef', navigationRef?.getCurrentRoute().name)
    setPage(navigationRef?.getCurrentRoute().name)
  }, [navigationRef]);

  return (
    <div className="App">
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          const r = navigationRef.current.getCurrentRoute().name;
          console.log('routeNameRef onReady:', r)
          routeNameRef.current = r;
        }}>
        <Header
          navigate={navigate}
          isStrict={isStrict}
          pageStart={pageStart}
          setIsStrict={setIsStrict}
          setSearchTerm={setSearchTerm}
          setWordIndex={setWordIndex}
          wordIndex={wordIndex}
          setPageStart={setPageStart}
          setPage={setPage}
          routeNameRef={routeNameRef}
          page={page} />
        <Stack.Navigator
          initialRouteName='Notes'>
          <Stack.Screen
            initialParams={{}}
            name={'Alphabet'}
            children={() => {
              return (<AlphabetREAL />);
            }} />
          <Stack.Screen
            initialParams={{
              searchTerm,
              pageStart
            }}
            searchTerm={searchTerm}
            pageStart={pageStart}
            name={'WordsIGot'}
            children={() => {
              return (<Alphabet
                isStrict={isStrict}
                searchTerm={searchTerm}
                pageStart={pageStart}
              />);
            }} />
          <Stack.Screen
            initialParams={{
              wordIndex
            }}
            name={'Notes'}
            children={() => {
              return (<Notes
                wordIndex={wordIndex}
              />
              );
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <footer className='App-footer'>
      </footer>
    </div>
  );
}

export default App;
