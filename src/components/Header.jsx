import React, { useState, useEffect } from "react";
import { Text } from "react-native-web";
import { useNavigation } from '@react-navigation/native';

export const Header = ({
  isStrict,
  pageStart,
  setSearchTerm,
  setPageStart,
  setIsStrict
}) => {
  const navigation = useNavigation();

  const [textInput, setTextInput] = useState('');
  useEffect(() => {
    if (textInput.length >= 2) {
      setSearchTerm(textInput);
    } else {
      setSearchTerm('')
    }
  }, [textInput]);

  const changeStrict = () => {
    setIsStrict(!isStrict)
  }

  const { innerWidth: width } = window;
  const aTagStyle = {
    fontFamily: 'revert',
    fontSize: 24,
    padding: 5,
    textDecoration: 'underline',
    marginLeft: 5,
    marginRight: 5
  };

  const nextPage = () => {
    console.log('next')
    if (pageStart < 409785) {
      setPageStart(pageStart + 1000)
    } else if (pageStart === 409000) {
      setPageStart(pageStart + 785)
    }
  }
  const previousPage = () => {
    if (pageStart >= 1000) {
      setPageStart(pageStart - 1000);
    } else if (pageStart === 409785) {
      setPageStart(pageStart - 785);
    }
  }

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
          <button style={ aTagStyle } onClick={() => previousPage()}>Previous</button>
          {true /* page === 'Alphabet' */ && <text>{pageStart} to {pageStart + 1000}</text>}
          <button style={aTagStyle} onClick={() => nextPage()}>Next</button>
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
            fontSize: 8
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
        <button style={aTagStyle} onClick={() => navigation.navigate('Notes')}>Note</button>
        <button style={aTagStyle} onClick={() => navigation.navigate('Alphabet')}>Alphabet</button>
        {/* <a style={aTagStyle}>Game</a> */}
      </div>
    </header>
  )
}