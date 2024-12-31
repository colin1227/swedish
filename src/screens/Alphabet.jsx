import React, { useState, useEffect, useCallback } from 'react';
import { SWEalphabet, ENalphabet, fisrtCharEN, firstCharSWE } from '../helper';
import { Text } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

export const Alphabet = (params) => {
  const { innerWidth: width } = window;
  const navigation = useNavigation();
  console.log('params', params)
  const open = (unfiltered, lang) => {
    const alphabet = unfiltered.filter(v => v !== 'symbols')

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {
          alphabet.map((letter, index) => {
            return (
              <Text
                onPress={() => {
                  if (lang === 'swe') {
                    console.log('firstCharSWE[index]', firstCharSWE[index])
                    // setPage("WordsIGot");
                    navigation.navigate('WordsIGot', { pageStart: firstCharSWE[index] });
                  } else {
                    navigation.navigate('WordsIGot', { searchTerm: letter, pageStart: fisrtCharEN[index] });
                  }
                }}
                style={{
                  fontSize: 34,
                  marginRight: 10,
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: '#FFFFFF'
                }}>
                {letter.toUpperCase()}
              </Text>
            )
          })
        }
      </div>
    )
  }
  console.log('typeof SWEalphabet', typeof SWEalphabet, SWEalphabet)
  return (
    <div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 65,
        flexDirection: 'column'
      }}>
        <div
          style={{ paddingBottom: 10 }}>
          <Text
            style={{
              fontSize: 32,
              color: 'white'
            }}>Swedish Alphabet</Text>
        </div>
        <div>
          {open(SWEalphabet, 'swe')}
        </div>
        <div style={{
          paddingBottom: 10
        }}>
          <Text style={{
            fontSize: 32,
            color: 'white'
          }}>English Alphabet</Text>
        </div>
        {open(ENalphabet, 'en')}
      </div >
    </div >
  )
}

