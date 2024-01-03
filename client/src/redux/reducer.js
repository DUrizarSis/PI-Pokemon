import { GET_ALL, GET_TYPES, TYPE_FILTER, SEARCH_POKE, ADD_POKEMON, ORIGIN_FILTER, ORDER, ATTACK_FILTER, DELETE_POKE } from "./action-types";

const initialState = {
    types: [],
    // pokemons: [],
    allPokemons: [],
    filteredPokemons: [],
}

const Reducer = (state = initialState, { type, payload })=> {
    switch(type) {
        case GET_ALL:
            return {
                ...state,
                // pokemons: payload,
                allPokemons: payload,
                filteredPokemons: payload,
            }
            
        case GET_TYPES:
            return {
                ...state,
                types: payload
            }

        case ADD_POKEMON:
            return {
                ...state,
                // pokemons: [...state.pokemons, payload],
                allPokemons: [...state.allPokemons, payload],
                filteredPokemons: [...state.filteredPokemons, payload],
            }

        case ORDER:
            const orderedPokemons = [...state.filteredPokemons].sort((a, b) => {
                if (payload === 'A') {
                    return a.name.localeCompare(b.name); 
                } else {
                    return b.name.localeCompare(a.name); 
                }
            });

            return {
                ...state,
                filteredPokemons: orderedPokemons
            }

        case ATTACK_FILTER:
            const orderedByAttack = [...state.filteredPokemons].sort((a, b) => {
                if (payload === 'A') {
                    return a.attack - b.attack; 
                } else {
                    return b.attack - a.attack;
                }
            });

            return {
                ...state,
                filteredPokemons: orderedByAttack
            }

        case TYPE_FILTER:
            const filterByType = [...state.allPokemons].filter((poke) => {
                if (poke.types && Array.isArray(poke.types)) {
                    const foundType = poke.types.find(
                        type => type.name.toLowerCase() === payload.toLowerCase()
                    );
                    if (foundType) {
                        return true; // If the type is found in "types"
                    }
                }
                if (poke.Types && Array.isArray(poke.Types)) {
                    const foundType = poke.Types.find(
                        type => type.name.toLowerCase() === payload.toLowerCase()
                    );
                    if (foundType) {
                        return true; // If the type is found in "Types"
                    }
                }
                return false; // If the type is not found 
            })
            return {
                ...state,
                filteredPokemons: filterByType
            }

        case ORIGIN_FILTER:
            const filterByOrigin = payload === 'API'
            ? state.allPokemons.filter(poke => poke.id.toString().length <= 30)
            : state.allPokemons.filter(poke => poke.id.toString().length >= 30);
    
            return {
                ...state,
                filteredPokemons: filterByOrigin
            }
        
        case SEARCH_POKE:
            return {
                ...state,
                filteredPokemons: [payload]
            }

        case DELETE_POKE:
            const updatedPokemons = state.filteredPokemons.filter(poke => poke.id !== payload);
            
            return {
                ...state,
                filteredPokemons: updatedPokemons
            };

        default:
            return {...state};
    }
}

export default Reducer;