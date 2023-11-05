import './App.css';
import { Alphabet } from './components/Alphabet';
import { Header } from './components/Header';
import React, { useEffect, useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageStart, setPageStart] = useState(0);
  useEffect(() => {
    console.log(`pageStart: ${pageStart}`);
  },[pageStart]);
  return (
    <div className="App">
      <Header setSearchTerm={setSearchTerm} pageStart={pageStart} setPageStart={setPageStart} />
      <Alphabet searchTerm={searchTerm} pageStart={pageStart} />
      <footer className='App-footer'>
      </footer>
    </div>
  );
}

export default App;
