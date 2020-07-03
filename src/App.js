import React from 'react';
import CardTable from './CardTable';
import GetNewDeckCode from './GetNewDeckCode';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Deck of Cards</h1>
      <GetNewDeckCode />
      <CardTable />
    </div>
  );
}

export default App;
