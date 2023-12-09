const axios = require('axios');
const { Pokemons, Types } = require('../db');
const { Sequelize } = require('sequelize');
const { URL_API } = process.env

const getPokemonName = async(req, res)=> {

    try {
        const {name} = req.query;

        const nameLower = name.toLowerCase();

        const searchPokemonApi = await axios(`${URL_API}/${nameLower}`);
    
        if(searchPokemonApi) {
            const { data } = searchPokemonApi;
    
            const pokemonResult = {
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[3].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map((opt) => {
                    return {
                        name: opt.type.name
                    }
                })
            }
    
            res.status(200).json(pokemonResult)
        } else {
            const searchPokemonDb = await Pokemons.findOne({
                where: Sequelize.where (
                    Sequelize.fn('lower', Sequelize.col('pokemons.name')),
                    Sequelize.fn('lower', name)
                ),
                includes: {
                    model: Types,
                }
            })

            if(searchPokemonDb) res.status(200).json(searchPokemonDb)
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {
    getPokemonName
}