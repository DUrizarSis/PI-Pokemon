// import style from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { orderCards, filterByAttack, filterByType, filterByOrigin, getAll } from '../../redux/actions';
import style from './Filters.module.css'
import update from '../../assets/reload.svg'

function Filters() {

  const dispatch = useDispatch();
  const types = useSelector(state => state.types);


  //Handle Filters
  const handleTypeFilter = (event) => {
    dispatch(filterByType(event.target.value));
  };

  const handleOriginFilter = (origin) => {
    dispatch(filterByOrigin(origin));
  };

  //Handle Orders
  const handleOrderFilter = (order) => {
    dispatch(orderCards(order))
  };

  const handleAttackFilter = (attack) => {
    dispatch(filterByAttack(attack))
  }

  //Reset
  const resetPokes = () => {
    dispatch(getAll())
  }

  return (
    <div className={style.filters}>
      <h2 className={style.headFilters}>Filters</h2>

      <div className={style.filtersOne}>
        <div>
          <h3 className={`${style.headFilter} ${style.filt1}`}>Type</h3>
          <select className={style.filter1} onChange={handleTypeFilter}>
            <option value="" disabled>All Types</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className={`${style.headFilter} ${style.filt1}`}>Origin</h3>
          <select className={style.filter1} onChange={(e) => handleOriginFilter(e.target.value)}>
              <option value="" disabled>Origin</option>
              <option value="API">API</option>
              <option value="DB">LOCAL</option>
          </select>
        </div>
      </div>

      <div className={style.filtersTwo}>
        <div>
          <h3 className={`${style.headFilter} ${style.filt2}`}>A-Z Order</h3>
          <select className={style.filter2} onChange={(e) => handleOrderFilter(e.target.value)}>
              <option value="" disabled>Order</option>
              <option value="A">Ascendente</option>
              <option value="Z">Descendente</option>
          </select>
        </div>

        <div>
          <h3 className={`${style.headFilter} ${style.filt2}`}>Attack Order</h3>
          <select className={style.filter2} onChange={(e) => handleAttackFilter(e.target.value)}>
              <option value="" disabled>Attack</option>
              <option value="A">Ascendente</option>
              <option value="Z">Descendente</option>
          </select>
        </div>
      </div>

      <div className={style.btnCont}>
        <button onClick={resetPokes} className={style.btn}> <img src={update} alt="update-btn" className={style.updateImg} /> reload</button>
      </div>
    </div>
  );
};

export default Filters;