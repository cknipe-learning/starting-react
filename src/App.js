// Mine didn't have this, do I need it?
import React from "react";
import PropTypes from "prop-types";

import './App.css';
import styled from '@emotion/styled';

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

const Title = styled.h1`
  text-align: center
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  column-gap: 1rem;
}}
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0rem;
`;

function App() {
  const [filter, setFilter] = React.useState("");
  const [pokemonList, setPokemonList] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  
  // Runs a function in reaction to a change
  // If you give it any values in the 2nd arg, it runs when that changes
  // Otherwise, it runs once and never again
  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then(resp => resp.json())
      .then(data => setPokemonList(data));
  }, [])
  
  return (
    <Container>
      <Title>Pokemon Search</Title>
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      
      <TwoColumnLayout>
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemonList
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

        <div>
        <h2>Selected:</h2>
          {!selectedItem && (<span> Nothing Selected</span>)}
          {selectedItem && <PokemonInfo {...selectedItem}/>}
        </div>
      </TwoColumnLayout>
      
    </Container>
  );
}

export default App;
