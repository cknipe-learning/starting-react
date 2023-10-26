// Mine didn't have this, do I need it?
import React from "react";
import PropTypes from "prop-types";

import './App.css';
import pokemonlist from "./pokemon.json";

// Aside:
// Ctrl+Alt+Down puts cursors on multiple lines

// This is a Component:
// it's a function. 
// You can define its properties with PropTypes later, that then you access in the JSX here.
// You can also define custom events
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button 
        onClick={() => onSelect(pokemon)}
      >Select!</button>
    </td>
  </tr>
);

// This is the minimum needed for PropTypes.
// There's more stuff you could put, but just need what you use
// Q: Is this necessarily based on how the json is structured??
PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect: PropTypes.func,
};

// Another Component
const PokemonInfo = ({name, base}) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map((key)=>(
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div>
);

PokemonInfo.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
    base: PropTypes.shape({
      HP: PropTypes.number.isRequired,
      Attack: PropTypes.number.isRequired,
      Defense: PropTypes.number.isRequired,
      "Sp. Attack": PropTypes.number.isRequired,
      "Sp. Defense": PropTypes.number.isRequired,
      Speed: PropTypes.number.isRequired,
    }),
  }),
  onSelect: PropTypes.func,
};


function App() {
  const [filter, setFilter] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);
  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}
      >
      <h1 className="title">Pokemon Search</h1>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '70% 30%',
          columnGap: "1rem",
        }}
      >
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemonlist
              .filter((pokemonItem) => pokemonItem.name.english.toLowerCase().includes(filter))
              .slice(0, 20).map((pokemonItem) => (
              <PokemonRow 
                pokemon={pokemonItem}
                key={pokemonItem.id}
                onSelect={(pokemonItem) => setSelectedItem(pokemonItem)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Selected:</h2>
          {!selectedItem && (<span> Nothing Selected</span>)}
          {selectedItem && <PokemonInfo {...selectedItem}/>}
      </div>
    </div>
  );
}

export default App;
