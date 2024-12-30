import React, { useState, useEffect, useCallback } from "react";
import { Text } from "react-native-web";
// import { Link } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export const Header = ({
  // navigator,
  isStrict,
  pageStart,
  wordIndex,
  setPage,
  setSearchTerm,
  setPageStart,
  setIsStrict,
  setWordIndex,
  routeNameRef,
  page
}) => {
  const navigation = useNavigation();
  const [textInput, setTextInput] = useState('');

  const pageNavigation = useCallback((pageName) => {
    setPage(pageName);
    navigation.navigate(pageName);
  }, [navigation]);

  useEffect(() => {
    if (page) {
      console.log("page", page)
    }
  }, [page]);
  useEffect(() => {
    if (textInput.length >= 2) {
      setSearchTerm(textInput);
    } else {
      setSearchTerm('')
    }
  }, [textInput, setSearchTerm]);

  const changeStrict = () => {
    setIsStrict(!isStrict)
  };

  const { innerWidth: width } = window;
  const aTagStyle = {
    fontFamily: 'revert',
    fontSize: 24,
    padding: 5,
    textDecoration: 'underline',
    marginLeft: 5,
    marginRight: 5,
    zIndex: 5
  };

  const nextWord = useCallback(() => {
    console.log('next word');
    setWordIndex(wordIndex + 1);
  }, [setWordIndex, wordIndex]);

  const nextPage = useCallback(() => {
    console.log('next page');
    if (pageStart < 409785) {
      setPageStart(pageStart + 1000);
    } else if (pageStart === 409000) {
      setPageStart(pageStart + 785);
    }
  }, [pageStart, setPageStart]);

  const previousWord = useCallback(() => {
    console.log('previous word');
    setWordIndex(wordIndex - 1);
  }, [setWordIndex, wordIndex]);

  const previousPage = useCallback(() => {
    console.log('previous page');
    if (pageStart >= 1000) {
      setPageStart(pageStart - 1000);
    } else if (pageStart === 409785) {
      setPageStart(pageStart - 785);
    }
  }, [pageStart, setPageStart]);

  // re-evaluate
  const next = useCallback(() => {
    if (page === 'WordsIGot') {
      console.log('wordsIGot next')
      nextPage();
    } else if (page === 'Notes') {
      nextWord();
    }
  }, [nextPage, nextWord, page]);

  const previous = useCallback(() => {
    if (page === 'WordsIGot') {
      previousPage();
    } else if (page === 'Notes') {
      previousWord();
    }
  }, [page, previousPage, previousWord]);

  return (
    <header className="App-header" style={{
      position: 'fixed',
      backgroundColor: '#006AA7',
      minHeight: 50,
      display: 'flex',
      fontSize: 12,
      color: 'white',
      zIndex: 1,
      width: width
    }}>
      <div style={{
        width: width * (2 / 3),
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        justifyContent: 'space-around'
      }}>
        <div>
          <button style={aTagStyle} onClick={() => previous()}>Previous</button>
          {page === 'WordsIGot' && <Text>{pageStart} to {pageStart + 1000} of 410,746</Text>}
          <button style={aTagStyle} onClick={() => next()}>Next</button>
        </div>
        <div
          style={{
            display: 'flex',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Text style={{
              color: '#FFFFFF',
            }}>Strict Search</Text>
            <input
              type="checkbox"
              value={isStrict}
              onChange={changeStrict}
              style={{
                marginRight: '10px'
              }} />
          </div>
          <input style={{
            height: 26,
          }} onChange={(event) => {
            setTextInput(event.target.value)
          }} />
        </div>
      </div>
      <div style={{
        width: width / 3,
        justifyContent: 'space-between',
      }}>
        {/* <Link to={{ screen: 'Words', params: {} }} style={aTagStyle}>Words</Link>
        <Link to={{ screen: 'Alphabet', params: {} }} style={aTagStyle}>Alphabet</Link>
        <Link to={{ screen: 'Notes', params: {} }} style={aTagStyle}>Notes</Link> */}
        {/*
        
        Guess the Word:
         - i guesses, n seconds
         - i * n seconds
         - show the word on return
         - show an option to google the word in EN or SWE
         - show an option to hear the word in google translate
         - the words that show up multiple times slightly diffrent would be good for learning etymology of the language.
        <Link style={aTagStyle}>Game</Link> */}

        <button style={aTagStyle} onClick={() => pageNavigation('WordsIGot')}>WordsIGot</button>
        <button style={aTagStyle} onClick={() => pageNavigation("Notes")}>Notes</button>
        <button style={aTagStyle} onClick={() => pageNavigation('Alphabet')}>Alphabet</button>
      </div >
    </header >
  )
}