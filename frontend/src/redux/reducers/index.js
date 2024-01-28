import { combineReducers } from "redux";
import {
  pokemonDetailReducer,
  pokemonReducer,
  pokemonImageReducer,
  myPokemonReducer,
  pokemonCatchReducer,
} from "./pokemonReducer";

const reducers = combineReducers({
  allPokemons: pokemonReducer,
  imgPokemon: pokemonImageReducer,
  detPokemon: pokemonDetailReducer,
  myPokemon: myPokemonReducer,
  catchPokemons: pokemonCatchReducer,
});

export default reducers;
