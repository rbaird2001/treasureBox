import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameCard from './components/GameCard';
import Search from './routes/Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Search />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
