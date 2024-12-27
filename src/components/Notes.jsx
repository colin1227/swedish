import React, { useState, useEffect } from 'react';
import { selectWord, allENvowels, allSWEVowels, symbolsIndexes } from '../helper'
import { Text, TextInput, CheckBox } from "react-native-web";
const fontSize = 16;
const marginLeft = 50;

const field = (title, text, handleTextChange, width = 450) => {
  return (
    <div style={{
      width,
      backgroundColor: 'rgb(0, 106, 167)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Text style={{
        color: 'black',
        fontSize: 16,
        marginLeft,
        marginTop: 10,
        marginBottom: 2,
      }}>{title}</Text>
      <TextInput
        style={{
          marginTop: 10,
          marginBottom: 25,
          marginLeft,
          marginRight: 50,
          height: 50,
          backgroundColor: "#FFFFFF"
        }}
        rows={4}
        multiline
        value={text}
        onChangeText={(e) => handleTextChange(e)}
      />
    </div>
  );
}

const Notes = ({ /* wordIndex */ }) => {
  const wordIndex = 54420;
  const [EN_word, setEN_word] = useState('');
  const [SWE_word, setSWE_word] = useState('');

  const [isImportant, setIsImportant] = useState(false);

  const [EN_Vowels, setEN_Vowels] = useState([]);
  const [numberOfENVowels, setNumberOfENVowels] = useState([]);

  const [SWE_Vowels, setSWE_Vowels] = useState([]);

  const [numberOfShortFormVowels, setNumberOfShortFormVowels] = useState(0);
  const [numberOfLongFormVowels, setNumberOfLongFormVowels] = useState(0);

  const [shortFormVowelIndexes, setShortFormVowelIndexes] = useState([]);
  const [longFormVowelIndexes, setLongFormVowelIndexes] = useState([]);

  const [notesOnWord, setNotesOnWord] = useState('');

  useEffect(() => {    
    const { en, swe } = selectWord(wordIndex);
    
    // console.log('wordIndex', wordIndex)
    // console.log('en', en, 'swe', swe);
    setEN_word(en);
    setSWE_word(swe);
  }, [wordIndex]);

  useEffect(() => {
    if (!symbolsIndexes.includes(wordIndex)) {
      let numberOfENVowels = 0;
      let _ENVowels = [];
      for(let i = 0; i < EN_word.length; i++) {
        if (allENvowels.includes(i)){ // add rules for y based on sylables?
          numberOfENVowels = numberOfENVowels + 1; // try ++
          _ENVowels = [..._ENVowels, i];
        }
      }
      setNumberOfENVowels(numberOfENVowels);
      setEN_Vowels(_ENVowels);
    }
  }, [EN_word])

  const wordParser = (word) => {
    return (
      <div
        style={{
          paddingTop: 25,
          paddingBottom: 50,
          width: 450,
          backgroundColor: 'rgb(0, 106, 167)',
          borderTopLeftRadius: 11.25,
          borderTopRightRadius: 11.25,
          display: 'inline-block'
        }}
      >{word.split('').map((letter) => {
        return(
          <Text
          key={`${letter}-${Math.random()}`}
          style={{
            backgroundColor: 
            allSWEVowels.includes(letter) ? 
            "#FFFFFF" :
            "#AFAFAF",
            borderColor: 'black',
            borderWidth: '1px',
            boderStyle: 'solid',
            fontSize: 36,
            textAlign: 'center',
            minWidth: 20,
            margin: 1
          }}
          >{letter}</Text>
        )
      })}</div>
    );
  }

  const submit = () => {
    let wordOptions = {
      notesOnWord,
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

  const [messageBody, setMessageBody] = useState('');
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        marginTop: 165,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 15,
          marginRight: '25%',
          marginLeft: '25%',
          borderBottomLeftRadius: 11.25,
          borderBottomRightRadius: 11.25
        }}
      >
        {SWE_word.length && wordParser(SWE_word)}
        <div style={{
                width: 450,
                backgroundColor: 'rgb(0, 106, 167)',
                display: 'flex',
                flexDirection: 'column-reverse',
                paddingBottom: 25
        }}>
        <CheckBox
          style={{
            marginLeft,
            marginRight: 25,
            height: 25,
            width: 25
          }}
          onValueChange={() => setIsImportant(!isImportant)} />
        <Text
          style={{
            marginTop: 10,
            marginLeft,
            marginBottom: 12,
            fontSize
          }}
        >Important?</Text>
        </div>
          {field("EN vowels", EN_Vowels, setEN_Vowels)}
          {field("SWE vowels", SWE_Vowels, setSWE_Vowels)}
          {field("Notes about Word", messageBody, setMessageBody)}
      </div>
    </div>
  )
}

export default Notes;