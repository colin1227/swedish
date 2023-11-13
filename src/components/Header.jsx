import React, { useState, useEffect } from "react";

export const Header = ({ navigator, pageStart, setSearchTerm, setPageStart }) => {
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    if (textInput.length >= 2) {
      setSearchTerm(textInput);
    } else {
      setSearchTerm('')
    }
  }, [setSearchTerm, textInput]);

  const { innerWidth: width } = window;
  const aTagStyle = {
    fontFamily: 'revert',
    fontSize: 24,
    padding: 5,
    textDecoration: 'underline'
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
          <button style={aTagStyle} onClick={() => previousPage()}>Previous</button>
          <button style={aTagStyle} onClick={() => nextPage()}>Next</button>
        </div>
        <input style={{
          height: 26,
        }} onChange={(event) => {
          setTextInput(event.target.value)
        }} />
      </div>
      <div>
        <div style={{ fontSize: 24 }}>{pageStart} - {pageStart + 1000} of 410,746</div>
      </div>
      <div style={{
        width: width / 3,
        justifyContent: 'space-between',
      }}>
        <button onClick={() => navigator.navigate('Home')} style={aTagStyle}>Home Page</button>
        <button onClick={() => navigator.navigate('Brevity')} style={aTagStyle}>Alphabet</button>
        <button onClick={() => navigator.navigate('Brevity')} style={aTagStyle}>Translate Tango</button>
        <button onClick={() => navigator.navigate('Brevity')} style={aTagStyle}>Game</button>
      </div>
    </header>
  )
}