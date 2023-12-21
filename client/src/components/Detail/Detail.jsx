import style from './Detail.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';

function Detail() {

    const [pokemon, setPokemon] = useState({})
    const { idPokemon } = useParams();

    useEffect(()=> {
        const pokemonData = async() => {
            try {
                const { data } = await axios(`http://localhost:3001/pokemons/${idPokemon}`);
                setPokemon(data);
            } catch (error) {
                console.log(error);
            }
        }
        pokemonData();
    }, [idPokemon]);

    const { id, name, image, hp, attack, defense, speed, height, weight, types, Types } = pokemon;
    const pokemonTypes = types || Types;


    return (
        <div>
            <NavBar/>

            <div>
                <h2>{id}</h2>
                <h2>{name}</h2>
                <img src={image} alt="image-pokemon"/>
                <h3>{hp}</h3>
                <h3>{attack}</h3>
                <h3>{defense}</h3>
                <h3>{speed}</h3>
                <h3>{height}</h3>
                <h3>{weight}</h3>

                {pokemonTypes && (
                    <ol>
                        {/* Verificar que el array no está vacío antes de mapearlo */}
                        {pokemonTypes.length > 0 ? (
                        pokemonTypes.map((type) => (
                            <li key={type.id}>{type.name}</li>
                        ))
                        ) : (
                            <li>No hay tipos disponibles</li>
                        )}
                    </ol>
                )}
            </div>

            
        </div>
    )
}

export default Detail;