const { Sequelize } = require('sequelize');
const axios = require('axios');
const { Pokemons, Types } = require('../db');
const { URL_API } = process.env


const getPokemonId = async(req, res)=> {

    const { idPokemon } = req.params;

    const idToString = idPokemon.toString()

    try {
        if(idToString.length === 32) { //Validacion de longitud
            const pokemonDbData = await Pokemons.findOne({ //Busqueda en DB
                where: {
                    id: idPokemon
                },
                include:{ //Retornar cada uno y sus datos, utilizando findAll ✓
                    model: Types,
                    through: {
                        attributes: [],
                    }
                }
            })

            res.status(200).json(pokemonDbData);
        } else {
            const response = await axios(`${URL_API}/${idPokemon}`); //Busqueda en API
            const { data } = response;
            const pokemonApiData = {
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

            res.status(200).json(pokemonApiData);
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    getPokemonId
}