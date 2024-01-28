import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectedPokemon } from "../redux/actions/pokemonActions";
import "react-toastify/dist/ReactToastify.css";
import CatchPokemon from "./CatchPokemon";

const PokemonDetail = () => {
  const { pokemonId } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detPokemon);
  const { name, img, moves, types, success } = pokemon;

  const fetchPokemonDetail = async () => {
    const response = await axios
      .get("http://localhost:4000/api/pokemon/" + pokemonId)
      .catch((err) => {
        console.log("error", err);
      });
    dispatch(selectedPokemon(response.data));
  };

  useEffect(() => {
    if (pokemonId && pokemonId !== "") fetchPokemonDetail();
  }, [pokemonId]);

  return (
    <div className="ui grid equal width container m-5">
      {Object.keys(pokemon).length === 0 ? (
        <div className="ui grid container is-centered mt-5">Loading ....</div>
      ) : (
        <div className="ui grid container m-5">
          <div className="ui grid container">
            <hr />
          </div>
          <div className="ui grid container m-5">
            <article className="media box">
              <figure className="media-left image is-256x256">
                <img
                  style={{ width: "300px" }}
                  className="box"
                  alt=""
                  src={img}
                />
              </figure>
              <div className="media-content">
                <div className="content">
                  <div>
                    <strong className="label is-large">{name}</strong>
                    <br />

                    <label className="label">Moves : {moves.name}</label>
                    <label className="label">Type : {types.name}</label>
                    <div className="box has-background-primary-light">
                      {success}
                    </div>
                  </div>
                </div>
                <CatchPokemon />
                <nav className="level is-mobile">
                  <div className="level-left">
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fas fa-reply"></i>
                      </span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fas fa-retweet"></i>
                      </span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small">
                        <i className="fas fa-heart"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
              <div className="media-right">
                <Link to={"/"}>
                  <button className="delete has-background-danger-dark"></button>
                </Link>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
