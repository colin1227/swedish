// const fs = require('fs');
const { options } = require('./modules/selectImportantWords');
const helper = require('./helper');
const { wordList: swe_wordList } = require('./wordlists/swe_wordlist.json');
const { wordList: en_wordlist } = require('./wordlists/en_wordlist.json');
const t = require('./modules/selectImportantWords')
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
//     vowels: swe_wordList[index].filter(char => SWEvowels.includes(char.toLowerCase()));
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
      vowels: [],
      numberOfShortFormVowels: 0,
      numberOfLongFormVowels: 0,
      shortFormVowels: [],
      longFormVowels: [],
    }

  }
  console.log(wordlistLength)
}

// const test = () => {
//   const r = fs.readFileSync('../wordlists/swe_wordlist.json');
//   console.log(r[0])
// }

// loopThroughSwedishWords()
const index = 11200

console.log(modules.createOptionsOfWord(swe_wordList[index], index))