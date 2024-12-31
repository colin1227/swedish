import React, { useState, useEffect } from 'react';
import { selectiveZipper } from '../helper';
import { Header } from '../components/Header';

export const WordsIGot = ({ navigationRef, pageStart, searchTerm }) => {
  const { innerWidth: width } = window;
  const { en: defaultEN, swe: defaultSWE } = selectiveZipper(0, 1000);
  // make these an unfilteredWords
  const [ENwords, setENwords] = useState(defaultEN)
  const [SWEwords, setSWEwords] = useState(defaultSWE);
  // filteredWords
  const [ENfilteredWords, setENfilteredWords] = useState(defaultEN);
  const [SWEfilteredWords, setSWEfilteredWords] = useState(defaultSWE);

  useEffect(() => {
    const { en, swe } = selectiveZipper(pageStart, pageStart + 1000);
    setENwords(en);
    setSWEwords(swe);
    setENfilteredWords(en);
    setSWEfilteredWords(swe);
    console.log(`pageStart: ${pageStart}`);
  }, [pageStart]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      let ENtoReplace = [];
      let SWEtoReplace = [];
      for (let i = 0; i < ENwords.length; i++) {
        if (searchTerm && (ENwords[i].includes(searchTerm) || SWEwords[i].includes(searchTerm))) {
          ENtoReplace.push(ENwords[i]);
          SWEtoReplace.push(SWEwords[i]);
        }
      }
      console.log('finished for loop')
      setENfilteredWords(ENtoReplace);
      setSWEfilteredWords(SWEtoReplace);
    } else {
      setENfilteredWords(ENwords);
      setSWEfilteredWords(SWEwords);
    }
  }, [ENwords, SWEwords, searchTerm, pageStart]);

  return (
    <div style={{
      textAlign: 'center',
      backgroundColor: '#bbbbbb',
    }}>
      <div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          paddingTop: 65
        }}>
          {
            SWEfilteredWords.map((w, i) => {
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 24,
                    flexGrow: 1,
                    width: width / 4,
                    height: 100
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                    <div>{w}</div>
                    <div>{ENfilteredWords[i]}</div>
                  </div>
                </div>
              )
            })}
          <button onClick={() => setPageStart(pageStart + 1000)}>asdf</button>
        </div>
        {/* <footer className='App-footer'>
        </footer> */}
      </div>
    </div>

  )
}

