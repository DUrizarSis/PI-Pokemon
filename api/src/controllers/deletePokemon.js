const { Pokemons } = require('../db');

//New
const deletePokemon = async( req, res)=> {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id);

    try {
        await Pokemons.destroy({where: {id}})

        res.status(200).json('Pokemon deleted succesfully');
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el pokemon'});
    }
}

module.exports = {
    deletePokemon
}