import React from "react";
import { CssBaseline } from "@material-ui/core";
import styled from "@emotion/styled";

import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";

import PokemonContext from "./PokemonContext";

import "./App.css";

const Title = styled.h1`
    text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;

// Define the Reducer function
const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload
      };
    case "SET_POKEMON":
      return {
        ...state,
        pokemon: action.payload
      };
    case "SET_SELECTED_POKEMON":
      return {
        ...state,
        selectedPokemon: action.payload
      };
    default:
      throw Error("Unrecognized action type");
  }
};

function App() {
  const [state, dispatch] = React.useReducer(pokemonReducer, {
    filter: "",
    pokemon: [], // Would this be ok to be null?
    selectedPokemon: null
  });

  React.useEffect(() => {
    fetch("/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => dispatch({
        type: "SET_POKEMON",
        payload: data,
      }));
  }, []);

  if (!state.pokemon) {
    return <div>Loading data</div>;
  }

  return (
    <PokemonContext.Provider
      value = {{
        state, dispatch
      }}>
      <PageContainer>
        <CssBaseline />
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </PageContainer>
    </PokemonContext.Provider>
  );
}

export default App;
