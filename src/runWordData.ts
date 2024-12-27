// const fs = require('fs');
const { options } = require('./modules/selectImportantWords');
const helper = require('./helper');
const { wordList: swe_wordList } = require('./wordlists/swe_wordlist.json');
const { wordList: en_wordlist } = require('./wordlists/en_wordlist.json');
const modules = require('./modules/selectImportantWords')
const testLength = 1000;
const wordlistLength =
  swe_wordList.length === en_wordlist.length ?
    swe_wordList.length :
    false;

// const gatherOptions = (index) => {
//   return {
//     sweWord: swe_wordList[index],
//     enWord: en_wordlist[index],
//     isImportant: false,
//     vowels: swe_wordList[index].filter(char => allSWEvowels.includes(char.toLowerCase()));
//   }
// }

const loopThroughSwedishWords = () => {
  if (!wordlistLength) {
    return false;
  }
  for (let i = 0; i < testLength; i++) {
    let wordOption = {
      sweWord: swe_wordList[i],
      enWord: en_wordlist[i],
      isImportant: false,
      sweVowels: [],
      enVowels: [],
      numberOfShortFormVowels: 0,
      numberOfLongFormVowels: 0,
      shortFormVowelIndexes: [],
      longFormVowelIndexes: [],
    }

  }
  console.log(wordlistLength)
}

// const readSWE = () => {
//   const r = fs.readFileSync('../wordlists/swe_wordlist.json');
//   console.log(r[0])
// }

// loopThroughSwedishWords()
const index = 11200

console.log(modules.createOptionsOfWord(swe_wordList[index], index))