const { addPokemon } = require('../handlers/addPokemon')


const postPokemon = async(req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

        if (!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types) {
            return res.status(406).json({ error: 'All fields are required' });
        } else {
            const lowerName = name.toLowerCase();
            const newPokemon = await addPokemon(lowerName, image, hp, attack, defense, speed, height, weight, types);

            if(newPokemon) {
                res.status(200).json({message: 'Pokemon created successfully'})
            }
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

// const postPokemon = async (req, res) => {
//     try {
//         const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

//         if (!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types) {
//             return res.status(406).json({ error: 'All fields are required' });
//         }

//         const lowercaseName = name.toLowerCase();

//         //Types validation
//         if(types.length < 2) {
//             return res.status(400).json({message: 'At least 2 types are required'})
//         }

//         //Name validation in the API

//         let apiError = false;

//         // Name validation in the API2
//         let apiResponse;
//         try {
//             apiResponse = await axios(`${URL_API}/${lowercaseName}`);
//         } catch (error) {
//             apiError = true;
//         }

//         if (!apiError && apiResponse.data) {
//             return res.status(400).json({ message: 'Pokemon already exists' });
//         }

//         //Name validation in the DB
//         const dbResponse = await Pokemons.findOne({
//             where: {name: lowercaseName}
//         })
//         if(dbResponse) {
//             return res.status(400).json({message: 'Pokemon already exist'})
//         }

//         // Creation of the new pokemon
//         try {
//             const newPokemon = await Pokemons.create({
//                 name: lowercaseName,
//                 image,
//                 hp,
//                 attack,
//                 defense,
//                 speed,
//                 height,
//                 weight
//             });

//             if (!newPokemon) {
//                 return res.status(500).json({ message: 'Failed to create Pokémon' });
//             }

//             const typesSearch = await Types.findAll({ where: { name: types.map(type => type.name.toLowerCase()) } });

//             // Si no se encontraron tipos
//             if (typesSearch.length === 0) {
//                 return res.status(404).json({ message: 'Types do not exist in DB' });
//             }

//             try {
//                 await Promise.all(
//                     typesSearch.map(async (dbType) => {
//                         await newPokemon.addType(dbType);
//                     })
//                 );

//                 res.status(200).json({ message: 'Pokemon created successfully' });
//             } catch (error) {
//                 console.error('Error associating types with Pokémon:', error);
//                 res.status(500).json({ message: 'Error associating types with Pokémon' });
//             }
//         } catch (error) {
//             res.status(500).json({ message: 'Error creating Pokémon' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

module.exports = {
    postPokemon
}