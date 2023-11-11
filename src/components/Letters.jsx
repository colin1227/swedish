import React, { useState, useEffect } from 'react';
import { selectiveZipper, SWEalphabet, SWEallOfChar } from '../helper';

export const Letters = () => {
  const [wordsOfLetter, setWordsOfLetter] = useState([]);
  return (
    <div>
      {SWEalphabet.map((v, i) => {
        return (
          <div
            style={{
            fontWeight: 'bold'
          }}
            onClick={(e) => {
              const wOL = SWEallOfChar(e.target.value);
              setWordsOfLetter(wOL);
            }}
          >
            {v}
          </div>
        )
      })}
    </div>
  )
}