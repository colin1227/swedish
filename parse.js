const fs = require('fs');
const { wordList } = require('./src/swe_wordlist.json');
const translate = (...args) => import('translate').then(({default: translate}) => translate(...args));

const sweToEn = async(w) => {
    const enTranslation = await translate(w, {from: 'swe', to: 'en'});
    return enTranslation;
}

const toEnglish = async(start, interval) => {
    const fuckItIndex = [4,321858, 410785]
    const portionOfDictionary = [];
    // 410786
    for(let i = start; i < start + interval; i++) {
        if (!fuckItIndex.includes(i)) {
            const lb = sweToEn(wordList[i]).catch(reason => {
                console.log(`the reason why ${reason}. \n found at ${i}th interval`)
                return reason
            })
            portionOfDictionary.push(lb);
        } else {
            console.log(`pushing ${i}`)
            portionOfDictionary.push(wordList[i])
        }
    }
    return Promise.all(portionOfDictionary);
}

// const ArrayifyAFile = (file) => {
//   let reader = fs.readFileSync(file, 'utf-8');
//   reader = reader.toString().split(String.fromCharCode(10))
//   return reader;
// };
// const t = ArrayifyAFile('/Users/colindaniel/Documents/swedish/swe_wordlist.txt');


const jsonTemplate = (val) => {
return `
{
    "wordList": ${val}
}
`
}

const readFile = (filePath) => {
    let reader = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(reader)
}

let enWordlistPath = '/Users/colindaniel/Documents/swedish/en_wordlist3.json';

const writeToFile = (value, filePath) => {
    const json = readFile(filePath);
    const _wordList = json.wordList;
    let toStore = [];
    if (_wordList.length > 0) {
        toStore = [..._wordList, ...value]
    } else {
        toStore = [...value]
    }
    let writer = fs.writeFile(filePath,
        jsonTemplate(JSON.stringify(toStore)),
        (err) => {
        if (err) {
            console.log('there was an error writing', err);
        }
        console.log('file saved')
    });
}

// const initialWriteToFile = (value, fileName) => {
//     let writer = fs.writeFile(`/Users/colindaniel/Documents/swedish/${fileName}`, jsonTemplate(JSON.stringify(value)), (err) => {
//         if (err) {
//             console.log('there was an error writing', err);
//         }
//         console.log('file saved')
//     })
// };

let a = 410688;
const b = 15;
let g = [];
const looper = () => {
    try {
        const c = toEnglish(a,b);  
        c.then(d => {
            console.log('then', d)
            writeToFile(d, enWordlistPath)
            if(a < 410771) {
                console.log('a', a)
                console.log('b', b)
                a += b
                looper()
            }
        })
    } catch (err) {
        console.log('catch err', err)
    } finally {
        return Promise.all(g).then(u => u)
    }
}
// looper()

let writeValue = [];
let interval = 786;
let final = false;
// const theInterval = setInterval(() => {
//     if (interval < 786){
//         Promise.all(toEnglish(interval)).then(o => {
//             writeValue = [...writeValue, ...o]
//         })
//     } else if (!final) {
//         console.log('!final hit')
//         // interval = interval - 410785;
//         final = true;
//     } else {
//         console.log('else condition')
//         clearInterval(theInterval);
//         console.log(`write val ${writeValue}`)
//         writeToFile(writeValue, 'en_wordlist.txt')
//     }
//     interval += 3000;
// }, 23000);

// if (final) {
//     console.log(`write val ${writeValue}`)
//     writeToFile(writeValue, 'en_wordlist.txt')
// }

// writeToFile(writeValue, 'swe_wordlist.txt')