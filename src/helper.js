export const { wordList: SWE_wordlist } = require('./wordlists/swe_wordlist.json');
export const { wordList: EN_wordlist } = require('./wordlists/en_wordlist.json');

export const SWEalphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'å', 'ö', 'symbols'];
export const SWEconsonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
export const allSWEVowels = ['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'å', 'ö'];

export const ENalphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'symbols'];
export const ENconsonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
export const allENvowels = ['a', 'e', 'i', 'o', 'u', 'y'];

export const SWEcharCount = [
  17963, 28408, 4308, 13827, 9164,
  32359, 14409, 18938, 11663, 5063,
  30504, 16593, 23214, 10645, 10372,
  21120, 92, 16651, 55847, 25082,
  11383, 17117, 630, 32, 1143,
  242, 1883, 3405, 3995
]

export const ENcharCount = [
  11214, 13774, 22574, 12450, 9334,
  12954, 7236, 8776, 8844, 1242,
  1558, 8023, 15304, 5236, 86451,
  17676, 820, 12354, 28538, 94567,
  3458, 2909, 11842, 54, 586,
  242
]

// 39 length
export const indexBuffer = 38
export const symbols = [
  '-', '.net', '@',
  '/', '&', '%-enhet',
  '%-enheten', '%-enhetens', '%-enheter',
  '%-enheterna', '%-enheternas', '%-enheters',
  '%-enhets', '%-sats', '%-satsen',
  '%-satsens', '%-satser', '%-satserna',
  '%-satsernas', '%-satsers', '†',
  '|', '∞', '♀',
  '♂', '½', '½:s',
  'à', 'à jour', 'É',
  'É:et', 'É:ets', 'É:n',
  'É:na', 'É:nas', 'É:ns',
  'É:s', 'µ', 'μg'
]

export const symbolsIndexes = [
  0, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17,
  18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 30, 65089,
  65272, 65275, 65276, 65279, 65280, 65283,
  65284, 410783, 410784
]

export const SWE_of_ENindexMatcher = (ENchar) => {
  const ENalphabetIndex = ENalphabet.indexOf(ENchar);
  let index = 0;
  for (let i = 0; i < ENalphabetIndex; i++) {
    index += ENcharCount[i];
  }
  return index;
}

export const searchByTerm = (isStrict, term) => {
  let ENtoReplace = [];
  let SWEtoReplace = [];
  for (let i = 0; i < EN_wordlist.length; i++) {
    if (EN_wordlist[i].includes(term) || EN_wordlist[i].includes(term)) {
      ENtoReplace.push(EN_wordlist[i]);
      SWEtoReplace.push(SWE_wordlist[i]);
    }
  }
  console.log('finished for loop')
  return {
    ENtoReplace,
    SWEtoReplace,
  };
}

export const selectWord = (wordIndex) => {
  return {
    en: EN_wordlist[wordIndex],
    swe: SWE_wordlist[wordIndex]
  }
}

// If I want all of one letter I need to add
// the indexes of all the words starting with
// the same character.
// Min of 0, Max of 27
export const EN_of_SWEindexMatcher = (SWEchar) => {
  const SWEalphabetIndex = SWEalphabet.indexOf(SWEchar);
  let index = 0;
  for (let i = 0; i < SWEalphabetIndex; i++) {
    index += SWEcharCount[i];
  }
  return index;
}

export const SWEallOfChar = (char) => {
  const segmentedWordList = SWE_wordlist.filter((word) => {
    return word[0] === char;
  });
  return segmentedWordList;
};

export const ENallOfChar = (char) => {
  const segmentedWordList = EN_wordlist.filter((word) => {
    return word[0] === char;
  })
  return segmentedWordList;
}

export const findWeirdWords = () => {
  let weirdWords = []
  for (let i = 0; i < SWE_wordlist.length; i++) {
    if (!SWEalphabet.includes(SWE_wordlist[i][0].toLowerCase()) && SWE_wordlist[i][0].toLowerCase() !== 's') {
      weirdWords.push(i)
    }
  }
  return weirdWords;
}

export const selectiveZipper = (start, end) => {
  // console.log('zipped')
  let zipper = { en: [], swe: [] }
  let addendum = 0;
  for (let i = start; i < end + addendum; i++) {
    if (!symbols.includes(SWE_wordlist[i])) {
      zipper.en.push(EN_wordlist[i]);
      zipper.swe.push(SWE_wordlist[i]);
    } else {
      addendum += 1
    }
    // let zipper = { en: [], swe: [] }
    // for (let i = start; i < end; i++) {
    //   zipper.en.push(EN_wordlist[i]);
    //   zipper.swe.push(SWE_wordlist[i]);
  }
  return zipper;
}
console.log(SWE_wordlist.length)
