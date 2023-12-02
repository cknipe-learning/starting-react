import React from "react";
import styled from "@emotion/styled";

import PokemonContext from "../PokemonContext";

const PokemonFilter = () => {
    const { state: { filter }, dispatch } = React.useContext(PokemonContext);
    return (
        <Input
            type="text"
            value={filter}
            onChange={(evt) => dispatch({
                type: "SET_FILTER",
                payload: evt.target.value,
            })}
        />
    );
};

const Input = styled.input`
  width: 100%;
  padding: 0.2rem;
  font-size: large;
`;

export default PokemonFilter
