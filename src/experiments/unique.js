const { wordList: SWE_wordlist } = require('../wordlists/swe_wordlist.json');
const { wordList: EN_wordlist  } = require('../wordlists/en_wordlist.json');
const fs = require('fs');
// console.log(EN_wordlist.length)

const makeUnique = (wordlist) => {
  let finalList = [];
  let repeatedENList = [];
  let repeatedSWList = [];
  for(let i = 0; i < wordlist.length; i++) {
    if(!finalList.includes(wordlist[i])) {
      finalList.push(wordlist[i])
    } else {
      repeatedENList.push(wordlist[i]);
      repeatedSWList.push(SWE_wordlist[i])
    }
  };
  return {
    uniques: finalList,
    repeatedENList,
    repeatedSWList
  };
};

const filePath = '/Users/colindaniel/Documents/swedish/src/experiments/repeatResult.json';

const {repeatedENList, repeatedSWList} = makeUnique(EN_wordlist);

const thing = fs.writeFileSync(filePath, JSON.stringify({repeatedENList, repeatedSWList}))

// console.log(uniqueEN_wordlist.length);



// EN 
// original words: 410,785
// unique words: 239,740

// SW cant be converted the same way
// since it was the inital array.