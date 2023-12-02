import React from "react";
import PokemonType from "../PokemonType";
import PokemonContext from "../PokemonContext";

const PokemonInfo = () => {
    // Can't do the following because it could be null -->
    // const { selectedPokemon: { name: { english }, base } } = React.useContext(PokemonContext);

    const { state: {selectedPokemon}, dispatch } = React.useContext(PokemonContext);
    if (!selectedPokemon) console.log("null pokemon");
    else console.log("pokemon is ok");
    const toReturn = selectedPokemon ? (
        <div>
            <h2>{selectedPokemon.name.english}</h2>
            <table>
            <tbody>
                {Object.keys(selectedPokemon.base).map((key) => (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{selectedPokemon.base[key]}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    ) : null;

    return toReturn;
}

PokemonInfo.propTypes = PokemonType;

export default PokemonInfo;