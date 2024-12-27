const fs = require('fs');
const { allSWEvowels, SWEconsonants } = require('../../src/helper');
const { wordList: SWE_wordlist } = require('../wordlists/swe_wordlist.json');
const { wordList: EN_wordlist } = require('../wordlists/en_wordlist.json');
interface options {
  sweWord: string; //
  enWord: string; //
  isImportant: boolean; //
  vowels: string[];
  numberOfShortFormVowels: number;
  numberOfLongFormVowels: number;
  shortFormVowels: string[];
  longFormVowels: string[];
}

const changeImportance = (val) => {
  return !val;
}

const isAVowel = (char: string) => {
  return allSWEvowels.includes(char);
};

const findStringOfVowels = (word: string, index: number) => {
  let vowelString: string = word[index];
  for (let i = index + 1; i < word.length; i++) {
    if (allSWEvowels.includes(word[i])) {
      vowelString = vowelString + word[i];
    } else {
      i = word.length;
    }
  }
  return vowelString;
}

// findShortOrLongFormVowels
const isShortFormVowel = (word: string, index: number) => {
  if (SWEconsonants.includes(word[index + 1])) {
    return true;
  } else {
    return false;
  }
}

// Swedish to english comparison
const createOptionsOfWord = (word: string, index: number) => {
  // count vowels
  // are the vowels next to eachother?
  // how many consanants follow the last vowel
  // if it's 1 it is long form
  // if it's 2 it's short form

  const vowelsInWord = word.split('').filter(char => allSWEvowels.includes(char));
  const numberOfVowels = vowelsInWord.length;
  let shortFormVowels: string[] = [];
  let longFormVowels: string[] = [];
  for (let i = 0; i < word.length; i++) {
    // is there one more character after i?
    if (i + 1 < word.length) {
      const stringOfVowels = findStringOfVowels(word, i);
      const indexOfLastConstanant = stringOfVowels.length - 1 + i;
      if (isShortFormVowel(word, indexOfLastConstanant)) {
        shortFormVowels.push(stringOfVowels);
      } else {
        longFormVowels.push(stringOfVowels);
      }
    }
  }
  return {
    sweWord: word,
    enWord: EN_wordlist[index],
    isImportant: false,
    vowels: vowelsInWord,
    numberOfShortFormVowels: shortFormVowels.length,
    numberOfLongFormVowels: longFormVowels.length,
    shortFormVowels: shortFormVowels,
    longFormVowels: longFormVowels
  } as options;
}

module.exports = {
  changeImportance,
  isAVowel,
  findStringOfVowels,
  isShortFormVowel,
  createOptionsOfWord
}