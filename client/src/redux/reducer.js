import { GET_ALL, GET_TYPES, TYPE_FILTER, SEARCH_POKE, ADD_POKEMON, ORIGIN_FILTER, ORDER, ATTACK_FILTER } from "./action-types";

const initialState = {
    types: [],
    pokemons: [],
    allPokemons: [],
}

const Reducer = (state = initialState, { type, payload })=> {
    switch(type) {
        case GET_ALL:
            return {
                ...state,
                pokemons: payload,
                allPokemons: payload
            }
            
        case GET_TYPES:
            return {
                ...state,
                types: payload
            }

        case ADD_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, payload],
                allPokemons: [...state.allPokemons, payload]
            }

        case ORDER:
            const orderById = payload === 'A' 
            ? [...state.allPokemons].sort((a, b) => a.id - b.id)
            : [...state.allPokemons].sort((a, b) => b.id - a.id);

            return {
                ...state,
                pokemons: orderById
            }

        case ATTACK_FILTER:
            if(payload === 'A') {
                return {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) => a.attack - b.attack)
                }
            } else if(payload === 'Z') {
                return {
                ...state,
                pokemons: state.pokemons.sort((a, b) => b.attack.localeCompare(a.attack))}
            } else return {
                ...state,
                pokemons: state.pokemons.sort((a, b) => a.id - b.id)
            }

        case TYPE_FILTER:
            const filterByType = [...state.allPokemons].filter((poke) => {
                if (poke.types && Array.isArray(poke.types)) {
                    const foundType = poke.types.find(
                        type => type.name.toLowerCase() === payload.toLowerCase()
                    );
                    if (foundType) {
                        return true; // Si se encuentra el tipo en "types"
                    }
                }
                if (poke.Types && Array.isArray(poke.Types)) {
                    const foundType = poke.Types.find(
                        type => type.name.toLowerCase() === payload.toLowerCase()
                    );
                    if (foundType) {
                        return true; // Si se encuentra el tipo en "Types"
                    }
                }
                return false; // Si no se encuentra en ninguno
            })
            return {
                ...state,
                pokemons: filterByType
            }

        case ORIGIN_FILTER:
            const filterByOrigin = payload === 'API'
            ? state.allPokemons.filter(poke => poke.id.toString().length <= 30)
            : state.allPokemons.filter(poke => poke.id.toString().length >= 30);
    
            return {
                ...state,
                pokemons: filterByOrigin,
            }
        
        case SEARCH_POKE:
            return {
                ...state,
                pokemons: [payload]
            }

        default:
            return {...state};
    }
}

export default Reducer;