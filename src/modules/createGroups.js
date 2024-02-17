const combined = require('../wordlists/combined.json')
const groups = [
  ''
]

const randomWord = () => {
  const randomNumber = Math.floor(Math.random() * (combined.words.length - 2))
  console.log(combined.words[randomNumber])
}
randomWord()