const { wordList: SWE_wordlist } = require('./wordlists/swe_wordlist.json');
const { wordList: EN_wordlist  } = require('./wordlists/en_wordlist.json');

const SWEalphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'å', 'ö', 'symbols'];
const ENalphabet  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'symbols'];

const SWEcharCount = [
    17963, 28408,  4308, 13827,  9164,
    32359, 14409, 18938, 11663,  5063,
    30504, 16593, 23214, 10645, 10372,
    21120,    92, 16651, 55847, 25082,
    11383, 17117,   630,    32,  1143,
    242,  1883,  3405,  3995
  ]

const ENcharCount = [
    11214, 13774, 22574, 12450,  9334,
    12954,  7236,  8776,  8844,  1242,
     1558,  8023, 15304,  5236, 86451,
    17676,   820, 12354, 28538, 94567,
     3458,  2909, 11842,    54,   586,
      242
  ]

const SWE_of_ENindexMatcher = (ENchar) => {
    const ENalphabetIndex = ENalphabet.indexOf(ENchar);
    let index = 0;
    for(let i = 0; i < ENalphabetIndex; i++) {
        index += ENcharCount[i];
    }
    return index;
}

const searchByTerm = (isStrict, term) => {
    let ENtoReplace = [];
    let SWEtoReplace = [];
    for(let i = 0; i < ENwords.length; i++) {
        if(ENwords[i].includes(searchTerm) || ENwords[i].includes(searchTerm)) {
            ENtoReplace.push(ENwords[i]);
            SWEtoReplace.push(SWEwords[i]);
        }
    }
    console.log('finished for loop')
    return {
        ENtoReplace,
        SWEtoReplace,
    };
}

  // If I want all of one letter I need to add
  // the indexes of all the words starting with
  // the same character.
  // Min of 0, Max of 27
const EN_of_SWEindexMatcher = (SWEchar) => {
    const SWEalphabetIndex = SWEalphabet.indexOf(SWEchar);
    let index = 0;
    for(let i = 0; i < SWEalphabetIndex; i++) {
        index += SWEcharCount[i];
    }
    return index;
}

const SWEallOfChar = (char) => {
    const segmentedWordList = SWE_wordlist.filter((word) => {
       return word[0] === char;
    });
    return segmentedWordList;
};

const ENallOfChar = (char) => {
    const segmentedWordList = EN_wordlist.filter((word) => {
        return word[0] === char;
    })
    return segmentedWordList;
}

const letterList = []
// for(let i = 0; i < ENalphabet.length; i++) {
//     // const letter = SWE_of_ENindexMatcher(ENalphabet[i]);
//     const letter = ENallOfChar(ENalphabet[i]);
//     letterList.push(letter.length);
// }
// console.log(letterList)

const selectiveZipper = (start, end) => {
    console.log('zipped')
    let zipper = { en: [], swe: []}
    for(let i = start; i < end;i++) {
        zipper.en.push(EN_wordlist[i]);
        zipper.swe.push(SWE_wordlist[i]);
    }
    return zipper;
}

module.exports = {
    SWEalphabet,
    ENalphabet,
    SWEcharCount,
    ENcharCount,
    searchByTerm,
    SWE_of_ENindexMatcher,
    EN_of_SWEindexMatcher,
    SWEallOfChar,
    ENallOfChar,
    selectiveZipper,
}