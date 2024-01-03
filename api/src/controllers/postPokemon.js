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

module.exports = {
    postPokemon
}