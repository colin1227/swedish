import './App.css';
import { Alphabet } from './screens/Alphabet';
import { Header } from './components/Header';
import { NavigationContainer, useIsFocused, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { indexBuffer } from './helper';



const Stack = createNativeStackNavigator();

function App() {
  const navigationRef = createNavigationContainerRef();

  return (
    <NavigationContainer navigationRef={navigationRef}>
      <Stack.Navigator initialRouteName='Alphabet'>
        <Stack.Screen
          navigationKey='Abet'
          name={'Alphabet'}
          component={() => Alphabet({ navigationRef })} />
        <Stack.Screen
          navigationKey='Brev'
          name={'brevity'}
          component={() => <div> ooh</div>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
