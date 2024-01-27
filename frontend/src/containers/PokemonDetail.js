import React,{useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { catchPokemon, selectedPokemon } from "../redux/actions/pokemonActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PokemonDetail = ()=>{
  const {pokemonId}=useParams();
  const history = useNavigate()
  const pokemon = useSelector((state)=>state.detPokemon)
  const {id,name,img,moves,url, types,base}=pokemon
  const data = useSelector((state)=>state.catchPokemons)
  const {message}=data

  const dispatch = useDispatch() 

  const [c_id,setCID]=useState('')
  const [c_name,setNAME]=useState('')
  const [c_img,setIMG]=useState('')
  const [c_url,setURL]=useState('')
  const [c_base,setBASE]=useState('')
  
  
  const fetchPokemonDetail = async ()=>{
      const response = await axios
      .get(`http://localhost:4000/api/pokemon/${pokemonId}`)
      .catch((err)=>{
        console.log("error",err)
      })
      // console.log(selectedPokemon(response.data))
      dispatch(selectedPokemon(response.data))
  }
  const handleSubmit = async (event)=>{
      event.preventDefault();
      const responseCatch = await axios
        .post("http://localhost:4000/api/pokemon/catch",
         {
            id:c_id, 
            name:c_name,
            img:c_img,
            url:c_url,
            base:c_base
          },{
            headers: {
              'Content-Type': 'application/json'
            }
          })
      .then((res)=>{
        dispatch(catchPokemon(res.data))
        toast.success('Regitered !', {
        position:'top-center',
        autoClose:5000
        })
      history('/mypokemon')
      })
      .catch((err)=>{
        console.log("error : ", err)
      })
      
}
  const notify =  () =>  toast(` ${Object.values(data)}`);
      
useEffect(()=>{
    if(pokemonId && pokemonId !=="") fetchPokemonDetail()
    
},[pokemonId])
     
      
      return(
        <div className="ui grid equal width container m-5">
            {Object.keys(pokemon).length===0?(
           <div className="ui grid container is-centered mt-5">
            Loading ....
           </div>
        ):(
              <div className="ui grid container m-5">
              <div className="ui grid container">
              </div>
              <div className="ui grid container m-5">
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-256x256">
                      <img src={img}/>
                  
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong className="label is-large">{name}</strong>
                        <br/>
                        <input type="hidden" value={id} name="c_id" ref={() =>setCID(id) } />
                        <input type="hidden" value={name} name="c_name" ref={() =>setNAME(name)}/>
                        <input type="hidden" value={img} name="c_img" ref={() =>setIMG(img) }/>
                        <input type="hidden" value={url} name="c_url" ref={() =>setURL(url) }/>
                        <input type="hidden" value={base} name="c_base" ref={() =>setBASE(base) }/>
                        <label className="label" >Moves : {moves.name}</label>
                        <label className="label">Type : {types.name}</label>
                      </p>
                    </div>
                
                
                      <ToastContainer />
                    <form onSubmit={(event)=> handleSubmit(event)}>

                      <div className="buttons">
                
                        <button type="submit" onClick={notify} className="button is-success">Catch</button>
                 
                      </div>
                    </form>
                    <nav className="level is-mobile">
                      <div className="level-left">
                        <a className="level-item">
                          <span className="icon is-small"><i className="fas fa-reply"></i></span>
                        </a>
                        <a className="level-item">
                          <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                        </a>
                        <a className="level-item">
                          <span className="icon is-small"><i className="fas fa-heart"></i></span>
                        </a>
                      </div>
                    </nav>
                  </div>
                  <div className="media-right">
                    <Link to={'/'}>
                      <button className="delete"></button>
                    </Link>
                  </div>
                </article>
            </div>
            </div>
            
          )}
        </div>
    )
}

export default PokemonDetail