import React, { useState, useEffect, useCallback } from 'react';
import { SWEalphabet, ENalphabet } from '../helper';
import { Text } from 'react-native-web';

export const AlphabetREAL = () => {
  const { innerWidth: width } = window;

  const open = (unfiltered) => {
    const alphabet = unfiltered.filter(v => v !== 'symbols')
    console.log('alphabet', alphabet)
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {
          alphabet.map((letter) => {
            return (
              <Text style={{
                fontSize: 34,
                marginRight: 10,
                marginTop: 10,
                padding: 10,
                backgroundColor: '#00FFFF'
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
          {open(SWEalphabet)}
        </div>
        <div style={{
          paddingBottom: 10
        }}>
          <Text style={{
            fontSize: 32,
            color: 'white'
          }}>English Alphabet</Text>
        </div>
        {open(ENalphabet)}
      </div >
    </div >
  )
}

