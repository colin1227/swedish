import './App.css';
import { Alphabet } from './components/Alphabet'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button>Alphabet</button>
        <button>Translate Tango</button>
        <button>Game</button>
      </header>
      <Alphabet/>
      <footer className='App-footer'>

      </footer>
    </div>
  );
}

export default App;
