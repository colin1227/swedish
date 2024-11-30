import React, { useState, useEffect } from 'react';
import { searchByTerm, selectiveZipper } from '../helper';

// TODO: rename
export const Alphabet = ({isStrict ,searchTerm, pageStart}) => {
    const { innerWidth: width } = window;
    const { en: defaultEN, swe: defaultSWE } = selectiveZipper(0, 1000);
    // make these an unfilteredWords
    const [ENwords, setENwords] = useState(defaultEN)
    const [SWEwords, setSWEwords] = useState(defaultSWE);
    // filteredWords
    const [ENfilteredWords, setENfilteredWords] = useState(defaultEN);
    const [SWEfilteredWords, setSWEfilteredWords] = useState(defaultSWE);

    useEffect(() => {
        const {en, swe} = selectiveZipper(pageStart, pageStart + 1000);
        setENwords(en);
        setSWEwords(swe);
        setENfilteredWords(en);
        setSWEfilteredWords(swe);
        console.log('rerender')
    }, [pageStart]);

    useEffect(() => {
        if (searchTerm.length >= 2) {
            const searchResults = searchByTerm(isStrict, searchTerm);
            setENfilteredWords(searchResults.ENtoReplace);
            setSWEfilteredWords(searchResults.SWEtoReplace);
        } else {
            setENfilteredWords(ENwords);
            setSWEfilteredWords(SWEwords);
        }
    }, [searchTerm]);

    return (
        <div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
              {
              SWEfilteredWords.map((w, i) => {
                return (
                    <div
                    key={i}
                    style={{
                        fontSize: 24,
                        flexGrow: 1,
                        width: width / 3,
                        height: 100,
                        color: 'white',
                        backgroundColor: '#191515',
                        paddingTop: 65
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
            </div>
        </div>
    )
}

