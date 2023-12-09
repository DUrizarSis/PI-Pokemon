const axios = require('axios');
const { Pokemons, Types } = require('../db');
const { Sequelize } = require('sequelize');
const { URL_API, AMOUNT_ITEMS } = process.env


const getPokemonsAPI = async()=> {

    try {

        let pokemonsAPI = [];

        const response = await axios(`${URL_API}?limit=${AMOUNT_ITEMS}`);
        const APIdata = response.data.results; //Obtiene todos los resultados
        const URLSpokemons = []; //Almacenamiento de promesas
        
        APIdata.map((pok)=> {
            URLSpokemons.push(axios(pok.url));
        });

        const detailedPokemons = await Promise.all(URLSpokemons); //Obtener todos los pokemons de la API ✓


        pokemonsAPI = detailedPokemons.map((p)=> { //Retornar un cada uno y sus datos, utilizando map ✓
            return {
                id: p.data.id,
                name: p.data.name,
                image: p.data.sprites.other.dream_world.front_default,
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[3].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map((opt) => {
                    return {
                        name: opt.type.name
                    }
                })
            }
        })

        return pokemonsAPI;

    } catch (error) {
        return error;
    }
}

const getPokemonsDB = async()=> {
    try {

        let pokemonsDb = [];

        pokemonsDb = await Pokemons.findAll({ //Obtener todos los pokemons de la BDD ✓ 
            include:{ //Retornar cada uno y sus datos, utilizando findAll ✓
                model: Types,
                through: {
                attributes: [],
                }
            }
        })
        return pokemonsDb;
    } catch (error) {
        return error;
    }
}

const getAllPokemons = async (req, res) => {
    try {
        const pokemonsApiPromise = getPokemonsAPI();
        const pokemonsBdPromise = getPokemonsDB();

        const [pokemonsApi, pokemonsBd] = await Promise.all([pokemonsApiPromise, pokemonsBdPromise]);

        const allPokemons = pokemonsApi.concat(pokemonsBd); //Concatenar ambos objetos ✓

        res.status(200).json(allPokemons);
    } catch (error) {
        res.status(500).json({ message: error.message }); //Enviar un error ✓
    }
};

module.exports = {
    getAllPokemons
}





