import React from 'react';
import { selectWord } from '../helper';
import { TextInput } from 'react-native';
const Notes = ({ wordIndex }) => {
  const word = selectWord(wordIndex);
  console.log('word', word)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFAA',
        marginTop: 65,
        display: 'flex',
        justifyContent: 'space-around'
      }}>
      <text>
        EN: {word.en}
      </text>
      <text>
        SWE: {word.swe}
      </text>
      <div>
        <input />
      </div>
    </div>
  )
}

export default Notes;