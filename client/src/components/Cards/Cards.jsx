import { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination.jsx'; 
import style from './Cards.module.css';

function Cards() {
    const allPokemons = useSelector(state => state.pokemons);

    // Pagination settings
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className={style.container}>
            <div className={style.cardsCont}>
                {currentPokemons.map((pokemon) => (
                    <Card key={pokemon.id} pokemon={pokemon}/>
                ))}
            </div>

            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={allPokemons.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}


export default Cards;