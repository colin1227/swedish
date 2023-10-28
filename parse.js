const fs = require('fs');

const formatFile = (file) => {
  let reader = fs.readFileSync(file, 'utf-8');
  reader = reader.toString().split(String.fromCharCode(10))
  return reader;
};

const t = formatFile('/Users/colindaniel/Documents/swedish/swe_wordlist.txt');

const jsonPrompt = (val) => {
return `
{
    "wordList": ${val}
}
`
}
const writeToFile = (value) => {
    let writer = fs.writeFile('/Users/colindaniel/Documents/swedish/swe_wordlist.json', jsonPrompt(JSON.stringify(value)), (err) => {
        if (err) {
            console.log('there was an error writing', err);
        }
        console.log('file saved')
    })

}

writeToFile(t)