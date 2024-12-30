import React, { useState, useEffect, useCallback } from 'react';
import { selectWord, allENvowels, allSWEVowels, symbolsIndexes } from '../helper'
import { Button, Text, TextInput, CheckBox } from "react-native-web";
import debounce from 'lodash.debounce';
import { convertToObject } from 'typescript';

const fontSize = 16;
const marginLeft = 50;

const field = (title, text, handleTextChange, read, rows = 4, width = 450) => {
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
        readOnly={read}
        style={{
          marginTop: 10,
          marginBottom: 25,
          marginLeft,
          marginRight: 50,
          height: 50,
          backgroundColor: "#FFFFFF"
        }}
        rows={rows}
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

  const [messageBody, setMessageBody] = useState('');
  const [backgroundColors, setBackgroundColors] = useState(SWE_word.split('').map(() => '#FFFFFF'));
  const [pressed, setPressed] = useState([]);
  useEffect(() => {
    const { en, swe } = selectWord(wordIndex);
    setEN_word(en);
    setSWE_word(swe);
    // consider excluding the letter y when not following vowel rules.
    // look for syllable rules and other ways to parse this.
    const _ENVowels = en.split('').filter((letter) => allENvowels.includes(letter));
    console.log('_ENVowels', _ENVowels);
    setEN_Vowels(_ENVowels);

    const _SWEVowels = swe.split('').filter((letter) => allSWEVowels.includes(letter));
    console.log('_SWEVowels', _SWEVowels);
    setSWE_Vowels(_SWEVowels);

    setBackgroundColors(swe.split('').map((l) => allSWEVowels.includes(l) ? '#FFFFFF' : "#BABABA"));
    setPressed(swe.split('').map(() => 0));
  }, [wordIndex]);

  useEffect(() => {
    const allStateChangesAsAnObject = {
      EN_word,
      SWE_word,
      isImportant,
      EN_Vowels,
      SWE_Vowels,
      numberOfENVowels,
      numberOfShortFormVowels,
      numberOfLongFormVowels,
      shortFormVowelIndexes,
      longFormVowelIndexes,
      messageBody,
      backgroundColors
    };
    console.log('allStateChangesAsAnObject', allStateChangesAsAnObject)
  }, [EN_Vowels,
    EN_word,
    SWE_Vowels,
    SWE_word,
    backgroundColors,
    isImportant,
    longFormVowelIndexes,
    messageBody,
    numberOfENVowels,
    numberOfLongFormVowels,
    numberOfShortFormVowels,
    shortFormVowelIndexes])

  useEffect(() => {
    if (!symbolsIndexes.includes(wordIndex)) {
      let numberOfENVowels = 0;
      let _ENVowels = [];
      for (let i = 0; i < EN_word.length; i++) {
        if (allENvowels.includes(i)) { // add rules for y based on sylables?
          numberOfENVowels = numberOfENVowels + 1; // try ++
          _ENVowels = [..._ENVowels, i];
        }
      }
      setNumberOfENVowels(numberOfENVowels);
      setEN_Vowels(_ENVowels);
    }
  }, [EN_word])

  const wordParser = useCallback((word) => {
    return (
      <div>
        <div
          style={{
            paddingTop: 25,
            paddingBottom: 50,
            width: 450,
            backgroundColor: 'rgb(0, 106, 167)',
            borderTopLeftRadius: 11.25,
            borderTopRightRadius: 11.25,
            display: 'inline-block',
          }}
        >{word.split('').map((letter, index) => {
          const handlePress = debounce(() => {

            if (allSWEVowels.includes(letter)) {
              const newBackgroundColors = [...backgroundColors];
              const newPressed = [...pressed];
              if (pressed[index] === 0) {
                console.log(('case 1'));

                setNumberOfShortFormVowels(numberOfShortFormVowels + 1);
                setShortFormVowelIndexes([...shortFormVowelIndexes, index]);

                newBackgroundColors[index] = '#8adcff';
                newPressed[index] = 1;
              } else if (pressed[index] === 1) {
                console.log(('case 2'));

                setNumberOfShortFormVowels(numberOfShortFormVowels - 1);
                setNumberOfLongFormVowels(numberOfLongFormVowels + 1);

                console.log('shortFormVowelIndexes', shortFormVowelIndexes);
                const excluded = shortFormVowelIndexes.splice(1, 1);

                setShortFormVowelIndexes(excluded);
                setLongFormVowelIndexes([...longFormVowelIndexes, index]);

                newBackgroundColors[index] = '#fff0a3';
                newPressed[index] = 2;
              } else if (pressed[index] === 2) {
                console.log(('case 3, reset'));

                setNumberOfLongFormVowels(numberOfLongFormVowels - 1);

                console.log('longFormVowelIndexes', longFormVowelIndexes);
                const excluded = longFormVowelIndexes.splice(1, 1);
                console.log('excluded', excluded);

                setLongFormVowelIndexes(excluded);


                newBackgroundColors[index] = '#FFFFFF';
                newPressed[index] = 0;
              }
              setBackgroundColors(newBackgroundColors);
              setPressed(newPressed);
            }
          }, 250);

          return (

            <Text
              key={`${letter}-${index}`}
              onPress={handlePress}
              style={{
                backgroundColor: backgroundColors[index],
                borderColor: 'black',
                borderWidth: '1px',
                borderStyle: 'solid',
                fontSize: 36,
                textAlign: 'center',
                minWidth: 20,
                margin: 1
              }}
            >{letter}</Text>
          );
        })}</div>
        <div
          style={{
            width: 450,
            backgroundColor: 'rgb(0, 106, 167)',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 25
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: 50,
              marginBottom: 12
            }}
          >Short Form Vowels: {numberOfShortFormVowels}</Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: 50,
              marginBottom: 12
            }}
          >Long Form Vowels: {numberOfLongFormVowels}</Text>
        </div>
      </div>
    );
  }, [
    backgroundColors,
    longFormVowelIndexes,
    numberOfLongFormVowels,
    numberOfShortFormVowels,
    setLongFormVowelIndexes,
    setNumberOfLongFormVowels,
    setNumberOfShortFormVowels,
    shortFormVowelIndexes,
    pressed
  ]);

  const validateNotes = useCallback(() => {
    if (SWE_Vowels.length === longFormVowelIndexes + shortFormVowelIndexes) {
      console.log('valid')
      return true;
    } else {
      console.log('invalid')
      return false;
    }
  }, [SWE_Vowels, longFormVowelIndexes, shortFormVowelIndexes])

  const submit = () => {
    let wordOptions = {
      messageBody,
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
    // add to files
    // add last word index in separate file
    // to keep track of what I have taken note of

  }

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
        width: '100%',

      }}>
        <Text
          style={{
            color: 'white',
            fontSize: 36,
            textDecoration: 'underline'
          }}>SWE: {SWE_word}</Text>
        <Text
          style={{
            color: 'white',
            fontSize: 36
          }}>EN: {EN_word}</Text>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 15,
          marginRight: '42.5%',
          marginLeft: '42.5%',
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
            value={isImportant}
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
        {field("EN vowels", EN_Vowels, (() => { }), true, 1,)}
        {field("SWE vowels", SWE_Vowels, (() => { }), true, 1,)}
        {field("Notes about Word", messageBody, setMessageBody, false, 4)}
        <div
          style={
            {
              width: 450,
              backgroundColor: 'rgb(0, 106, 167)',
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: 25
            }}>

          <Button
            title='submit'
            style={{
              width: 350,
              height: 50,
              backgroundColor: 'hsl(148, 48.10%, 15.90%)',
              color: 'white',
              fontSize: 24,
              marginTop: 25,
              marginBottom: 25
            }}
            disabled={!validateNotes()}
            onClick={submit} />
        </div>
      </div>
    </div>
  )
}

export default Notes;