import { useState } from 'react';
import './index.css';

function App() {
  const [search, setSearch] = useState('');
  const data = [
    { term: 'Abacus', location: 'The Counting House', mnemonic: 'Imagine the pebbles as tiny soldiers marching leftward.' },
    { term: 'Abaris', location: 'Temple of Apollo', mnemonic: 'Picture him floating across vast distances, sustained only by Apollo’s favor.' },
    // Add other items here
  ];

  const filteredData = data.filter(item =>
    item.term.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header>
        <h1>Classical Mnemonic Palace</h1>
        <input
          type="text"
          placeholder="Search by term or location..."
          className="search-bar"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      <div className="grid-container">
        {filteredData.map((item, index) => (
          <div key={index} className="card">
            <div className="card-header">{item.term}</div>
            <div className="card-location">{item.location}</div>
            <div className="card-content">{item.mnemonic}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
