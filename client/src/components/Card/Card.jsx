import style from './Card.module.css';
import { Link } from 'react-router-dom';


function Card({pokemon}) {

    const { id, name, image, hp, types, Types} = pokemon;
    const pokemonTypes = types || Types;

    return (
        <div>
            <img src={image} alt="img-pokemon"/>
            <h3>{name}</h3>
            <h3>{hp}</h3>
            <ol>
                {/* Verificar que el array no está vacío antes de mapearlo */}
                {pokemonTypes.length > 0 && pokemonTypes.map((type) => (
                    <li key={type.id}>{type.name}</li>
                ))}
                {/* Si el array está vacío, mostrar un mensaje */}
                {pokemonTypes.length === 0 && <li>No hay tipos disponibles</li>}
            </ol>
            <Link to={`/detail/${id}`}>
                <button>Ver mas</button>
            </Link>
        </div>
    )
}

export default Card;