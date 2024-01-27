const express =require("express");
const pokemonController = require('../controller/pokemon')
const router = express.Router();
const apicache = require("apicache");
const cache = apicache.middleware


router.get("/",cache('5 minutes'), pokemonController.getAllPokemon,)
router.get("/:id",pokemonController.getDetailPokemon)
router.post("/catch",pokemonController.catchPokemon)
router.get("/me/list",pokemonController.getMyPokemon)

module.exports = router;
