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
        const check = await Catches.findAll({where:{id_pokemon:id},limit:2,order: [
            ['id', 'DESC']]
        })
        let sum = 0
        for (const dt of check) {
            
            sum += dt.same;
        
        }
        if(check.length == 0){
            payload ={
                id_pokemon:id,   
                same:sum,
                name:name,
                url:url,
                img:img,
                base:base
            }
            
        }else{
            
            payload ={
                id_pokemon:id,
                same:sum==0?sum+1:sum,
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
        
        if(level > 49 && prima(base) == false){

            res.json({
                message:`pokemon successfully captured`,
                data: {
                    success_rate : level+'%',
                    prima : prima(base)
                }
            })
            console.log(payload)
            Catches.create(payload)
        
        
        }else{
            
            // console.log(payload)
            res.json({
                message:`Failed to catch the Pokemon`,
                data :{ 
                    success_rate:level+'%',
                    prima : true
                }
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
// prima
function prima (num) {
    let status = true
    for(var i = num-1; i>1; i--) {
      if (num%i === 0) {
        status = false
      } 
    }
    return status
  }
module.exports ={
    getAllPokemon,
    getDetailPokemon,
    catchPokemon,
    getMyPokemon,
}