// import style from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { orderCards, filterByAttack, filterByType, filterByOrigin, getAll } from '../../redux/actions';
import style from './Filters.module.css'

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

  const handleOrderFilter = (order) => {
    dispatch(orderCards(order))
  };

  const handleAttackFilter = (attack) => {
    dispatch(filterByAttack(attack))
  }

  const resetPokes = () => {
    dispatch(getAll())
  }

  return (
    <div className={style.filters}>
      <h2>Filters</h2>

      <div>
        <h3>Type</h3>
        <select onChange={handleTypeFilter}>
          <option value="" disabled >All Types</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Origin</h3>
        <select onChange={(e) => handleOriginFilter(e.target.value)}>
            <option value="" disabled>Origin</option>
            <option value="API">API</option>
            <option value="DB">LOCAL</option>
        </select>
      </div>

      <div>
        <h3>Order</h3>
        <select onChange={(e) => handleOrderFilter(e.target.value)}>
            <option value="" disabled>Order</option>
            <option value="A">Ascendente</option>
            <option value="Z">Descendente</option>
        </select>
      </div>

      <div>
        <h3>Attack</h3>
        <select onChange={(e) => handleAttackFilter(e.target.value)}>
            <option value="" disabled>Attack</option>
            <option value="A">Ascendente</option>
            <option value="Z">Descendente</option>
        </select>
      </div>

      <div>
        <button onClick={resetPokes}>reload</button>
      </div>
    </div>
  );
};

export default Filters;