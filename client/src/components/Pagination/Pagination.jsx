import style from './Pagination.module.css';

function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
    return (
        <div className={style.pagination}>
            {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => (
                <button className={currentPage === i + 1 ? style.activePageItem : style.pageItem} key={i + 1} onClick={() => onPageChange(i + 1)}>{i + 1}</button>
            ))}
        </div>
    );
}

export default Pagination;