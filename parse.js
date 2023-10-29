const fs = require('fs');
const { wordList } = require('./src/swe_wordlist.json');
const translate = (...args) => import('translate').then(({default: translate}) => translate(...args));

const sweToEn = async(w) => {
    const enTranslation = await translate(w, {from: 'swe', to: 'en'});
    return enTranslation;
}

const toEnglish = async(interval) => {
    const fuckItIndex = [4]
    const portionOfDictionary = [];
    // 410786
    for(let i = 0; i < interval; i++) {
        if (!fuckItIndex.includes(i)) {
            const lb = sweToEn(wordList[i]).catch(reason => {
                console.log(`the reason why ${reason}. \n found at ${i}th interval`)
                return reason
            })
            portionOfDictionary.push(lb);
        } else {
            portionOfDictionary.push(wordList[i])
        }
    }
    return Promise.all(portionOfDictionary);
}


const c = toEnglish();

c.then(d => {
    console.log(d);
})


// const ArrayifyAFile = (file) => {
//   let reader = fs.readFileSync(file, 'utf-8');
//   reader = reader.toString().split(String.fromCharCode(10))
//   return reader;
// };
// const t = ArrayifyAFile('/Users/colindaniel/Documents/swedish/swe_wordlist.txt');

const jsonPrompt = (val) => {
return `
{
    "wordList": ${val}
}
`
}

const writeToFile = (value, fileName) => {
    let writer = fs.writeFile(`/Users/colindaniel/Documents/swedish/${fileName}`, jsonPrompt(JSON.stringify(value)), (err) => {
        if (err) {
            console.log('there was an error writing', err);
        }
        console.log('file saved')
    })

};
let writeValue = [];
let interval = 0;
let final = false;
const theInterval = setInterval(() => {
    if (interval < 786){
        toEnglish(interval).then(o => {
            writeValue = [...writeValue, ...o]
        })
    } else if (!final) {
        interval = interval - 410785;
        final = true;
    } else {
        clearInterval(theInterval);
    }
    interval += 3000;
}, 23000);

if (final) {
    writeToFile(writeValue, 'en_wordlist.txt')
}



// writeToFile(writeValue, 'swe_wordlist.txt')