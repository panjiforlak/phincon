import { ActionTypes } from "../constants/action-types";

const initialState = {
  pokemons: [],
  mypokemons: [],
};
export const pokemonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_LIST_POKEMON:
      return {
        ...state,
        pokemons: payload,
      };
    default:
      return state;
  }
};
export const myPokemonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_LIST_MY_POKEMON:
      return { ...state, mypokemons: payload };
    default:
      return state;
  }
};
export const pokemonImageReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.IMAGE_POKEMON:
      return { ...state, ...payload };
    default:
      return state;
  }
};
export const pokemonDetailReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.DETAIL_POKEMON:
      return { ...state, ...payload };
    default:
      return state;
  }
};
export const pokemonCatchReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.CATCH_POKEMON:
      return { ...state, ...payload };
    default:
      return state;
  }
};
