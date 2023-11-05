import React, { useState, useEffect } from 'react';
import { selectiveZipper } from '../helper';

export const Alphabet = ({searchTerm, pageStart}) => {
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
        console.log(searchTerm)
        if (searchTerm.length >= 2) {
            let ENtoReplace = [];
            let SWEtoReplace = [];
            for(let i = 0; i < ENwords.length; i++) {
                if(ENwords[i].includes(searchTerm) || ENwords[i].includes(searchTerm)) {
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
    }, [searchTerm]);

    return (
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
                        width: width / 3,
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
            </div>
        </div>
    )
}

