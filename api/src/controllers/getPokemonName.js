const axios = require('axios');
const { Pokemons, Types } = require('../db');
const { Sequelize } = require('sequelize');
const { URL_API } = process.env

const searchPokemonInAPI = async (nameLower) => {
    try {
        const response = await axios(`${URL_API}/${nameLower}`);
        if (response && response.status === 200) {
            const { data } = response;
            return {
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[3].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map((opt) => ({
                    name: opt.type.name,
                })),
            };
        }
        return null;
    } catch (error) {
        throw new Error(`Error searching in API: ${error.message}`);
    }
};

const searchPokemonInDB = async (name) => {
    const pokemon = await Pokemons.findOne({
        where: {
            name: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('name')),
                'LIKE',
                `%${name.toLowerCase()}%`
            )
        },
        include: {
            model: Types,
        },
    });
    return pokemon;
};

const getPokemonName = async (req, res) => {
    try {
        const { name } = req.query;
        const nameLower = name.toLowerCase();

        //console.log('Nombre a buscar en la base de datos:', nameLower);

        let pokemonFromAPI = null;
        let pokemonFromDB = null;

        try {
            pokemonFromAPI = await searchPokemonInAPI(nameLower);
        } catch (apiError) {
            console.error('Error searching in API:', apiError.message);
        }

        if (!pokemonFromAPI) {
            try {
                pokemonFromDB = await searchPokemonInDB(name);
            } catch (dbError) {
                console.error('Error searching in database:', dbError.message);
            }
        }

        if (pokemonFromAPI) {
            return res.status(200).json(pokemonFromAPI);
        } else if (pokemonFromDB) {
            console.log('Resultado de la búsqueda en la base de datos:', pokemonFromDB);
            return res.status(200).json(pokemonFromDB);
        } else {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




module.exports = {
    getPokemonName
}