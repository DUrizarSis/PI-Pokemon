import { GET_ALL, GET_TYPES, TYPE_FILTER, ATTACK_FILTER, SEARCH_POKE, ADD_POKEMON, ORIGIN_FILTER, ORDER, DELETE_POKE } from "./action-types";
import axios from 'axios';

const URL = 'http://localhost:3001/';
export const getAll = ()=> {
    return async(dispatch) => {
        try {
            const { data } = await axios(`${URL}pokemons`);
                return dispatch ({
                    type: GET_ALL,
                    payload: data
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getTypes = ()=> {
    return async(dispatch)=> {
        try {
            const { data } = await axios(`${URL}types`);
                return dispatch ({
                    type: GET_TYPES,
                    payload: data
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export const addPokemon = (pokemon)=> {
    return {
        type: ADD_POKEMON,
        payload: pokemon
    }
}

//Filters 

export const orderCards = (order)=> {
    return {
        type: ORDER,
        payload: order
    }
}

export const filterByAttack = (attack)=> {
    return {
        type: ATTACK_FILTER,
        payload: attack
    }
}

export const filterByType = (type)=> {
    return {
        type: TYPE_FILTER,
        payload: type
    }
}

export const filterByOrigin = (origin)=> {
    return {
        type: ORIGIN_FILTER,
        payload: origin
    }
}

export const searchPokemons = (name)=> {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL}pokemon?name=${name}`);

            return dispatch ({
                type: SEARCH_POKE,
                payload: data
            })
        } catch (error) {
            alert(`Pokemon with name ${name[0].toUpperCase() + name.slice(1)} not found`);
            throw error;   
        }
    }
}

//Extra
export const removePokemon = (id)=> {
    return async(dispatch) => {
        try {
            await axios.delete(`${URL}pokemons/${id}`);
    
            return dispatch ({
                type: DELETE_POKE,
                payload: id
            })
        } catch (error) {
            alert('Server Error');
            throw error;
        }
    }

}