const { wordList } = require('./swe_wordlist.json')

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'å', 'ö']


const allOfChar = (char) => {
    const r = wordList.filter((word) => {
       return word[0] === char;
    });
    return r;
};

const t = allOfChar('z')
