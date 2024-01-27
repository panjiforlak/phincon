import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PokemonComponent from "./PokemonComponent";
import axios from "axios";
import { setPokemon } from "../redux/actions/pokemonActions";
import {  useSearchParams } from "react-router-dom";

const PokemonList = ()=>{
    // const products = useSelector((state)=>state);

    const dispatch = useDispatch();

    const fetchPokemon = async (res)=>{
        const response = await axios
        .get("http://localhost:4000/api/pokemon?limit=12&offset=0")
        .catch((err)=>{
            console.log("error : ", err)
        })
        // console.log(setPokemon(response.data))
        dispatch(setPokemon(response.data.pokemon))
    };
    useEffect(()=>{

        fetchPokemon()
    },[])

    return(
        <div>
        
        <div className="ui grid container mt-6">
            <h1 className="label is-large">POKEMON LIST</h1>
                
        </div>
        <hr/>
        
        <div className="ui grid container is-widescreen">
            <PokemonComponent/>
        </div>
    </div>
    )
}

export default PokemonList