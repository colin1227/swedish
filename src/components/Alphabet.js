import react, { FC} from 'react'
import { allOfChar, alphabet } from '../../helper'
import translate from 'translate';

translate.engine = "deepl";

const letter = (l) => {
    const wordsOfLeter = allOfChar(l);
    const { innerWidth: width, innerHeight: height } = window;

    return (
        <div>
            <div
              style={{
                fontWeight: 'bolder',
                fontSize: 32
              }}
              className='letter-bold'>{String(l).toUpperCase()}</div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
              {wordsOfLeter.map((w) => {
                return (
                    <div style={{
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
                        <div>{(async() => await translate(w, {from: 'se', to: 'en'}))()}</div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export const Alphabet = () => {
    return (
    <div>
        {letter('a')}
    </div>
    )
}