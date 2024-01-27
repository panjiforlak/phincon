const express =require("express");
const axios = require("axios");
const Catches = require('../models/catch');

const getAllPokemon = async (req,res)=>{
    try{
        let {limit,offset}= req.query
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        let data = response.data

        const arr =[]
        for (const dt of data.results) {
            let obj = {}
            const images = await getImage(dt.url)

            obj.id = images.id;
            obj.name = dt.name;
            obj.url = dt.url;
            obj.img = images.sprites.front_default;
            
            arr.push(obj)
        }
        
        res.json({
            count:data.count,
            next:data.next,
            previous:data.previous,
            pokemon:arr
        })

    }catch(error){
        let code = error.response.status
        res.status(code?code:500).json({
            message:"Server Error",
            serverMessage:error,
        })
        console.log(error)
    }
}

const getImage = async (url)=>{
        try {
           let sum = await axios.get(url)
            return sum.data
        } catch (error) {
            console.log(error)
        }
  }

const getDetailPokemon = async (req,res)=>{
    try{
  
        const {id} = req.params;
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        res.json({
            id:parseInt(id),
            name:response.data.name,
            url: "https://pokeapi.co/api/v2/pokemon/"+id,
            img:response.data.sprites.front_default,
            moves:response.data.moves[0].move,
            types:response.data.types[0].type,
            base:response.data.base_experience
        })

    }catch(error){
        let code = error.response.status
        res.status(code?code:500).json({
            message:"Server Error",
            serverMessage:error,
        })
        console.log(error)
    }
}

const getMyPokemon = async (req,res)=>{
    try{
  
        let response = await Catches.findAll();
        let data=[]
        for (const dt of response) {
            let obj = {}
            obj.id=dt.id_pokemon
            obj.name=dt.name +'-'+ dt.same
            obj.url=dt.url
            obj.img=dt.img
            data.push(obj)
        }

        res.json({
            message:"retrieve data success",
            data: data
        })

    }catch(error){
        let code = error.response.status
        res.status(code?code:500).json({
            message:"Server Error",
            serverMessage:error,
        })
        console.log(error)
    }
}

const catchPokemon = async (req,res)=>{
    const {id,name,url,img,base} = req.body
    try{
        const check = await Catches.findOne({where:{id_pokemon:id},order:[['id','DESC']]})
        if(check==null){
            console.log("as")
            payload ={
                id_pokemon:id,   
                same:1,
                name:name,
                url:url,
                img:img,
                base:base
            }
        }else{
            payload ={
                id_pokemon:id,
                same:check.same+1,
                name:name,
                url:url,
                img:img,
                base:base
            }
        }
        let level = ""
        if(base >=0 && base <=50){
            level = 99;
        }else if(base >=51 && base <=100){
            level = 70;
        }else if(base >=101 && base <=150){
            level = 50;
        }else if(base >=151 && base <=10000){
            level = 30;
        }
        
        if(level < 50 ){

            res.json({
                message:`Pokemon is lost this Probability of ${level}%`
            })
        }else{
            Catches.create(payload)
            res.json({
                message:`Success catched Pokemon, this Probability of ${level}%`
            })
        }
       

    }catch(error){
        // let code = error.response.status
        res.status(500).json({
            message:"Server Error",
            serverMessage:error,
        })
        console.log(error)
    }
}

module.exports ={
    getAllPokemon,
    getDetailPokemon,
    catchPokemon,
    getMyPokemon,
}