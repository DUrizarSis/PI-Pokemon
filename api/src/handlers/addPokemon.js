const { Pokemons, Types } = require('../db');
const { Sequelize } = require('sequelize');

const addPokemon = async(name, image, hp, attack, defense, speed, height,weight, types)=> {
    if(types.length > 0 && types.length <= 2) {
        const [newPokemon, create] = await Pokemons.findOrCreate({
            where: { name: name },
            defaults: { name, image, hp, attack, defense, speed, height, weight, types}
        })

        if(create) {
            const nameTypes = types.map((t)=> t.name)
            const addTypes = await Types.findAll({
                where: {
                    name: {
                        [Sequelize.Op.in]: nameTypes
                    }
                }
            })

            return await newPokemon.addType(addTypes)
        } else {
            throw new Error('Pokemon already exists');
        }
    } else {
        throw new Error('At least 2 types are required')
    }
}

module.exports = {
    addPokemon
}