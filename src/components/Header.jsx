import React, {useState, useEffect} from "react";

export const Header = ({ pageStart, setSearchTerm, setPageStart }) => {
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    if (textInput.length >= 2) {
      setSearchTerm(textInput);
    } else {
      setSearchTerm('')
    }
  }, [textInput]);

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
    <header className="App-header" style={{  position: 'fixed',
      backgroundColor: '#006AA7',
      minHeight: 50,
      display: 'flex',
      fontSize: 12,
      color: 'white',
      zIndex: 1,
      width: width}}>
      <div style={{
        width: width * (2/3),
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
      <div style={{
        width: width / 3,
        justifyContent: 'space-between',
      }}>
        <a style={aTagStyle}>Alphabet</a>
        <a style={aTagStyle}>Translate Tango</a>
        <a style={aTagStyle}>Game</a>
      </div>
    </header>
  )
}