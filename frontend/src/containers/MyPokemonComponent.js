import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MyPokemonComponent = ()=>{
    const mypokemons = useSelector((state)=>state.myPokemon.mypokemons)
    const renderList = mypokemons.map((pokemon)=>{
        const {id,name,url,img}= pokemon;
        return(
            <div className="four wide column" key={name}>
                <Link  to={`/pokemon/${id}`}>
                    <div className="ui link cards">
                        <div className="card" style={{width:"250px",height:'350px'}}>
                            <div className="image">
                                <img src={img}/>
                            </div>
                            <div className="content">
                                <div className="header"> {name}</div>
                            </div>
                        </div>
                    </div>
                </Link>
        </div>
        );
    })
  return <>{renderList}</>
}

export default MyPokemonComponent