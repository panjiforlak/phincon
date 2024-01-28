import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonComponent from "./PokemonComponent";
import axios from "axios";
import { setPokemon } from "../redux/actions/pokemonActions";

const PokemonList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const pokemons = useSelector((state) => state.allPokemons.pokemons);
  const next = pokemons.next;
  const previous = pokemons.previous;

  //   const n_next = next.replace(
  //     "https://pokeapi.co/api/v2/pokemon",
  //     "http://localhost:4000/api/pokemon"
  //   );
  const fetchPokemon = async (res) => {
    const response = await axios
      .get("http://localhost:4000/api/pokemon?limit=20&offset=0")
      .catch((err) => {
        console.log("error : ", err);
      });
    // console.log(setPokemon(response.data))
    dispatch(setPokemon(response.data));
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <div className="ui grid container mt-6">
        <h1 className="label is-large">POKEMON LIST</h1>
      </div>
      <hr />
      <div className="ui grid container m-4">
        <nav
          className="pagination is-right"
          role="navigation"
          aria-label="pagination"
        >
          <a className="pagination-previous is-disabled">Previous</a>
          <a className="pagination-next has-background-black-ter has-text-white-bis">
            Next page
          </a>
        </nav>
      </div>

      <div className="ui grid container is-widescreen">
        {Object.keys(pokemons).length === 0 ? (
          <div className=" container is-max-desktop m-5">
            <div class="mt-5 is-primary">
              <progress class="progress is-small " max="100">
                100%
              </progress>
            </div>
          </div>
        ) : (
          <PokemonComponent />
        )}
      </div>
    </div>
  );
};

export default PokemonList;
