import './App.css';
import { WordsIGot } from './screens/WordsIGot';
import { Alphabet } from './screens/Alphabet'
import Notes from './screens/Notes';
import { Header } from './components/Header';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'; // { useIsFocused }
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
// import { indexBuffer } from './helper';

const Stack = createNativeStackNavigator();

function App() {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  const [searchTerm, setSearchTerm] = useState('');
  const [pageStart, setPageStart] = useState(0);
  const [isStrict, setIsStrict] = useState(false);
  const [page, setPage] = useState('');
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    console.log('pageStart', pageStart)
  }, [pageStart]);


  function navigate(name, params) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  }

  useEffect(() => {
    setPage(navigationRef?.getCurrentRoute().name)
  }, [navigationRef]);

  return (
    <div className="App">
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          const r = navigationRef.current.getCurrentRoute().name;
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
          initialRouteName='WordsIGot'>
          <Stack.Screen
            initialParams={{}}
            navigate={navigate}
            setPage={setPage}
            name={'Alphabet'}
            children={() => <Alphabet setPage={setPage} />}
          />
          <Stack.Screen
            name={'WordsIGot'}
            initialParams={{
              searchTerm,
              pageStart
            }}
            searchTerm={searchTerm}
            pageStart={pageStart}
            children={() => <WordsIGot
              isStrict={isStrict}
              searchTerm={searchTerm}
              pageStart={pageStart}
            />} />
          <Stack.Screen
            name={'Notes'}
            initialParams={{
              wordIndex
            }}
            children={() => <Notes wordIndex={wordIndex} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <footer className='App-footer'>
      </footer>
    </div>
  );
}

export default App;
