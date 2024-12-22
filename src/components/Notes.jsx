import React, { useState, useEffect } from 'react';
import { selectWord } from '../helper'
import { Text, TextInput } from "react-native-web";

const Notes = ({ wordIndex }) => {
  const [EN_word, setEN_word] = useState('');
  const [SWE_word, setSWE_word] = useState('');

  const [isImportant, setIsImportant] = useState(false);

  const [SWE_Vowels, setSWE_Vowels] = useState([]);
  const [EN_Vowels, setEN_Vowels] = useState([]);

  const [numberOfShortFormVowels, setNumberOfShortFormVowels] = useState(0);
  const [numberOfLongFormVowels, setNumberOfLongFormVowels] = useState(0);

  const [shortFormVowelIndexes, setShortFormVowelIndexes] = useState([]);
  const [longFormVowelIndexes, setLongFormVowelIndexes] = useState([]);

  const submit = () => {
    let wordOptions = {
      wordIndex,
      SWE_word,
      EN_word,
      isImportant,
      SWE_Vowels,
      EN_Vowels,
      numberOfShortFormVowels,
      numberOfLongFormVowels,
      shortFormVowelIndexes,
      longFormVowelIndexes,
    }

    const json = JSON.stringify(wordOptions)
  }

  useEffect(() => {
    const { en, swe } = selectWord(wordIndex);
    console.log('en', en, 'swe', swe);
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