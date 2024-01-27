import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MyPokemonComponent from "./MyPokemonComponent";
import axios from "axios";
import { getMyPokemon } from "../redux/actions/pokemonActions";


const MyPokemonList = ()=>{
    const dispatch = useDispatch();
    const myPokemonList = async ()=>{
        const response = await axios
        .get("http://localhost:4000/api/pokemon/me/list")
        .catch((err)=>{
            console.log("error : ", err)
        })
        // console.log(getMyPokemon(response.data.data))    
        dispatch(getMyPokemon(response.data.data))
    };

    useEffect(()=>{
        myPokemonList()
    },[])

    return(
        <div>
            <div className="ui grid container mt-6">
                <h1 className="label is-large">MY POKEMON</h1>
                
            </div>
            
            <div className="ui grid container is-widescreen">
                <MyPokemonComponent/>
            </div>

        </div>
    )
}

export default MyPokemonList