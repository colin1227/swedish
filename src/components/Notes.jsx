import React, { useState, useEffect } from 'react';
import { selectWord } from '../helper'
import { Text, TextInput } from "react-native-web";

const Notes = ({ wordIndex }) => {
  const [EN_word, setEN_word] = useState('');
  const [SWE_word, setSWE_word] = useState('');
  // const word = selectWord(wordIndex);
  // console.log('word', word)

  useEffect(() => {
    const { en, swe } = selectWord(wordIndex);
    setEN_word(en);
    setSWE_word(swe);
  }, [wordIndex])

  const [messageBody, setMessageBody] = useState('');
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        marginTop: 65,
      }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text
          style={{
            color: 'white',
            fontSize: 36
          }}>{SWE_word}</Text>
        <Text
          style={{
            color: 'white',
            fontSize: 36
          }}>{EN_word}</Text>
      </div>
      <div style={{
        marginTop: 15
      }}>
        <TextInput
          style={{
            height: 50
          }}
          row={4}
          multiline
          numberOfLines={4}
          value={messageBody}
          onChangeText={(e) => setMessageBody(e)}
        />
      </div>
    </div>
  )
}

export default Notes;