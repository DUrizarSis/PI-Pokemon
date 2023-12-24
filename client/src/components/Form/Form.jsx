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

        // Validar en cada cambio
        const validationErrors = { ...validation({ ...formData, [name]: value }), ...checkUniqueName(value) };
        setErrors(validationErrors);
    };

    const checkUniqueName = (value) => {
      const nameExists = allPokemons.some(pokemon => pokemon.name.toLowerCase() === value.toLowerCase());
      return nameExists ? { name: 'This Pokémon name already exists' } : "";
    };

    // const handleCheckbox = (event) => {
    //     const { value, checked } = event.target;
    //     let updatedTypes = [...formData.types];

    //     if (checked) {
    //         updatedTypes.push({ name: value }); // Agrega el tipo como un objeto
    //     } else {
    //         updatedTypes = updatedTypes.filter((type) => type.name !== value);
    //     }
    //     setFormData({ ...formData, types: updatedTypes });
    //     setErrors(validation({ ...formData, types: updatedTypes}));
    // };

    const handleCheckbox = (event) => {
      const { value, checked } = event.target;
      let updatedTypes = [...formData.types];
  
      if (checked) {
          if (updatedTypes.length < 2) { // Permite seleccionar solo si hay menos de 2 tipos seleccionados
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
                const response = await axios.post('http://localhost:3001/pokemons', formData); // Reemplaza 'URL_DEL_ENDPOINT' con tu URL real
                dispatch(addPokemon(response.data));
                navigate('/home'); // Redirige a la página de éxito después de enviar los datos
                alert('Pokemon created succesfully');
              } catch (error) {
                alert(error.response.data.error);
            }
        } else {
            console.log('Formulario inválido');
        }
    };

    return (

      <div className={style.mainContainer}>
        <div>
          <h3>¡Create your <span>pokemon!</span></h3>
          <p>Find images for your pokemons <a href="https://custom-doodle.com/collection/pokemon/" target='_blanck'>HERE</a></p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className={style.formDisplay}>

            <div className={style.formContainer}>
              <div className={style.inputs}>
                <input className={style.input} type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name"/>
                  {renderError('name')}
                <input className={style.input} type="number" name="hp" value={formData.hp} onChange={handleInputChange} placeholder="HP"/>
                  {renderError('hp')}
                <input className={style.input} type="number" name="defense" value={formData.defense} onChange={handleInputChange} placeholder="Defense"/>
                  {renderError('defense')}
                <input className={style.input} type="number" name="attack" value={formData.attack} onChange={handleInputChange} placeholder="Attack"/>
                  {renderError('attack')}
                <input className={style.input} type="number" name="speed" value={formData.speed} onChange={handleInputChange} placeholder="Speed"/>
                  {renderError('speed')}
                <input className={style.input} type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="Height"/>
                  {renderError('height')}
                <input className={style.input} type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="Weight"/>
                  {renderError('weight')}
                <input className={style.input} type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="Image"/>
                  {renderError('image')}
              </div>

              <div>
                <fieldset>
                    <legend>Choose your Pokemon's types*</legend>
                    {types.map(type => {
                        const isChecked = formData.types.some(selectedType => selectedType.name === type.name);
                        const disabled = formData.types.length >= 2 && !isChecked;

                        return (
                            <div key={type.id}>
                                <input
                                    type="checkbox"
                                    id={type.id}
                                    name="types"
                                    value={type.name}
                                    checked={isChecked}
                                    onChange={handleCheckbox}
                                    disabled={disabled} // Deshabilita si ya hay 2 tipos seleccionados y este no está seleccionado
                                />
                                <label htmlFor={type.id}>
                                    {type.name[0].toUpperCase() + type.name.slice(1)}
                                </label>
                            </div>
                        );
                    })}
                </fieldset>
                      {renderError('types')}
              </div>
            </div>

            <button className={style.btnSubmit} type="submit">Submit</button>


            {/* <fieldset>
                  <legend>Choose your Pokemon's types*</legend>
                  {types.map(type => { 
                      return <div key={type.id}>
                          <input type="checkbox" id={type.id} name="types" value={type.name} onChange={handleCheckbox}/>
                          <label htmlFor={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</label> 
                      </div>
                  })}
              </fieldset> */}
          </form>
        </div>
      </div>


        
      );
};

export default Form;