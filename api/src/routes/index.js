const { Router } = require('express');
// Importar todos los routers;
const { getAllPokemons } = require('../controllers/getPokemons');
const { getPokemonId } = require('../controllers/getPokemonId');
const { getPokemonName } = require('../controllers/getPokemonName');
const { postPokemon } = require('../controllers/postPokemon');
const { getTypes } = require('../controllers/getTypes');
const { deletePokemon } = require('../controllers/deletePokemon');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', getAllPokemons); 
router.get('/pokemons/:idPokemon', getPokemonId);
router.get('/pokemon', getPokemonName);
router.post('/pokemons', postPokemon );
router.get('/types', getTypes);
router.delete('/pokemons/:id', deletePokemon);

module.exports = router;
