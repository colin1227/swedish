import React, { useState, useEffect, useCallback } from 'react';
import { SWEalphabet, ENalphabet } from '../helper';

export const AlphabetREAL = () => {
  const { innerWidth: width } = window;

  const open = useCallback((unfiltered) => {
    const alphabet = unfiltered.filter(v => v !== 'symbols')
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {alphabet.map((letter) => {
          return (
            <text style={{
              fontSize: 34,
              marginRight: 10,
              marginTop: 10,
              padding: 10,
              backgroundColor: '#00FFFF'
            }}>
              {String(letter).toUpperCase()}
            </text>
          )
        })}
      </div>
    )
  }, [])

  return (
    <div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 65,
        flexDirection: 'column'
      }}>
        <div style={{
          fontSize: 32
        }}>
          Swedish Alphabet
        </div>
        {open(SWEalphabet)}
      </div>

      <div style={{
        fontSize: 32
      }}>
        English Alphabet
      </div>
      {open(ENalphabet)}
    </div>)
}

