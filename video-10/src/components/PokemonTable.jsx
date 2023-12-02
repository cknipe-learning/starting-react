import React from "react";
import PokemonRow from "./PokemonRow";

import PokemonContext from "../PokemonContext";

const PokemonTable = () => {
    const {
        state: { filter, pokemon },
        dispatch 
    } = React.useContext(PokemonContext);

    return (
        <table width="100%">
            <tbody>
                {pokemon
                .filter(({ name: { english } }) =>
                    english
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase())
                )
                .slice(0, 20)
                .map((pokemon) => (
                    <PokemonRow
                    pokemon={pokemon}
                    onClick={(pokemon) => dispatch({
                        type: "SET_SELECTED_POKEMON",
                        payload: pokemon,
                    })}
                    />
                ))}
            </tbody>
        </table>
    );  
};

export default PokemonTable;