import {ActionTypes} from "../constants/action-types"

export const setPokemon = (pokemons) => { 
    return {
        type:ActionTypes.GET_LIST_POKEMON,
        payload: pokemons
    };
};

export const getMyPokemon = (mypokemons) => { 
    return {
        type:ActionTypes.GET_LIST_MY_POKEMON,
        payload: mypokemons
    };
};

export const catchPokemon = (data) => { 
    return {
        type:ActionTypes.CATCH_POKEMON,
        payload: data
    };
};

export const imagePokemon = (imgpokemon) => { 
    return {
        type:ActionTypes.IMAGE_POKEMON,
        payload: imgpokemon
    };
};
export const selectedPokemon = (pokemon) => { 
    return {
        type:ActionTypes.DETAIL_POKEMON,
        payload: pokemon
    };
};


