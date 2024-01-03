import style from './Form.module.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, addPokemon } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import validation from "./validation";


function Form() {

    const types = useSelector(state => state.types);
    const allPokemons = useSelector(state => state.allPokemons);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!types.length) {
            dispatch(getTypes());
        }
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
    })

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value.toLowerCase() });
        //setErrors(validation({ ...formData, [name]: value }));

        // Validation in real time
        const validationErrors = { ...validation({ ...formData, [name]: value }), ...checkUniqueName(value) };
        setErrors(validationErrors);
    };

    const checkUniqueName = (value) => {
      const nameExists = allPokemons.some(pokemon => pokemon.name.toLowerCase() === value.toLowerCase());
      return nameExists ? { name: 'This Pokémon name already exists' } : "";
    };

    const handleCheckbox = (event) => {
      const { value, checked } = event.target;
      let updatedTypes = [...formData.types];
  
      if (checked) {
          if (updatedTypes.length < 2) { // Allows selection only if there are less than 2 types selected
              updatedTypes.push({ name: value });
          }
      } else {
          updatedTypes = updatedTypes.filter((type) => type.name !== value);
      }
        setFormData({ ...formData, types: updatedTypes });
        setErrors(validation({ ...formData, types: updatedTypes }));
    };

    const renderError = (field) => {
        return errors[field] && <p className={style.error}>{errors[field]}</p>;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formIsValid = Object.values(errors).every((error) => error === '');

        if (formIsValid) {
            try {
                const response = await axios.post('http://localhost:3001/pokemons', formData); 
                dispatch(addPokemon(response.data));
                navigate('/home'); // Redirect to home after sending data
                alert('Pokemon created succesfully');
              } catch (error) {
                alert(error.response.data.error);
            }
        } else {
            alert('Invalid Form');
        }
    };

    return (

      <div className={style.mainContainer}>
        <div className={style.textPage}>
          <h3 className={style.headCreate}>¡Create your <span className={style.pokeTitle}>pokemon!</span></h3>
          <p className={style.textCreate}>Find images for your pokemons <br /> <a href="https://custom-doodle.com/collection/pokemon/" target='_blanck' className={style.linkPokeImg}>HERE</a></p>
        </div>
        <div className={style.formContent}>
          <form onSubmit={handleSubmit} className={style.formDisplay}>

            <div className={style.formContainer}>
              <div className={style.inputs}>
                <input className={style.input} type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name"/>
                  <div className={style.errorCont}>{renderError('name')}</div>
                
                <input className={style.input} type="number" name="hp" value={formData.hp} onChange={handleInputChange} placeholder="HP"/>
                  <div className={style.errorCont}>{renderError('hp')}</div>
                
                <input className={style.input} type="number" name="defense" value={formData.defense} onChange={handleInputChange} placeholder="Defense"/>
                  <div className={style.errorCont}>{renderError('defense')}</div>
                
                <input className={style.input} type="number" name="attack" value={formData.attack} onChange={handleInputChange} placeholder="Attack"/>
                  <div className={style.errorCont}>{renderError('attack')}</div>
                
                <input className={style.input} type="number" name="speed" value={formData.speed} onChange={handleInputChange} placeholder="Speed"/>
                  <div className={style.errorCont}>{renderError('speed')}</div>
                
                <input className={style.input} type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="Height"/>
                  <div className={style.errorCont}>{renderError('height')}</div>
                
                <input className={style.input} type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="Weight"/>
                  <div className={style.errorCont}>{renderError('weight')}</div>
                
                <input className={style.input} type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="Image"/>
                  <div className={style.errorCont}>{renderError('image')}</div>
              </div>

              <div>
                <fieldset>
                    <legend className={style.headTypes}>Choose your Pokemon's types*</legend>
                    {types.map(type => {
                        const isChecked = formData.types.some(selectedType => selectedType.name === type.name);
                        const disabled = formData.types.length >= 2 && !isChecked;

                        return (
                            <div key={type.id} className={style.check}>
                                <input
                                    type="checkbox"
                                    id={type.id}
                                    name="types"
                                    value={type.name}
                                    checked={isChecked}
                                    onChange={handleCheckbox}
                                    disabled={disabled} 
                                />
                                <label htmlFor={type.id} className={style.nameType}>
                                    {type.name[0].toUpperCase() + type.name.slice(1)}
                                </label>
                            </div>
                        );
                    })}
                </fieldset>
                      <div className={style.errorCont}>{renderError('types')}</div>
              </div>
            </div>

            <button className={style.btnSubmit} type="submit">Submit</button>
          </form>
        </div>
      </div>


        
      );
};

export default Form;