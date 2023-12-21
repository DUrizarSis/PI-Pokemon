import style from './Form.module.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, addPokemon } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import validation from "./validation";

function Form() {

    const types = useSelector(state => state.types);
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
        setErrors(validation({ ...formData, [name]: value }));
    };

    const handleCheckbox = (event) => {
        const { value, checked } = event.target;
        let updatedTypes = [...formData.types];

        if (checked) {
            updatedTypes.push({ name: value }); // Agrega el tipo como un objeto
        } else {
            updatedTypes = updatedTypes.filter((type) => type.name !== value);
        }
        setFormData({ ...formData, types: updatedTypes });
        setErrors(validation({ ...formData, types: updatedTypes}));
    };

    const renderError = (field) => {
        return errors[field] && <p className={style.error}>{errors[field]}</p>;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formIsValid = Object.values(errors).every((error) => error === '');

        if (formIsValid) {
            try {
                const response = await axios.post('URL_DEL_ENDPOINT', formData); // Reemplaza 'URL_DEL_ENDPOINT' con tu URL real
                dispatch(addPokemon(response.data));
                navigate('/success'); // Redirige a la página de éxito después de enviar los datos
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
            }
        } else {
            console.log('Formulario inválido');
        }
    };

    return (
        <form onSubmit={handleSubmit}>

          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name"/>
            {renderError('name')}
          <input type="number" name="hp" value={formData.hp} onChange={handleInputChange} placeholder="HP"/>
            {renderError('hp')}
          <input type="number" name="defense" value={formData.defense} onChange={handleInputChange} placeholder="Defense"/>
            {renderError('defense')}
          <input type="number" name="attack" value={formData.attack} onChange={handleInputChange} placeholder="Attack"/>
            {renderError('attack')}
          <input type="number" name="speed" value={formData.speed} onChange={handleInputChange} placeholder="Speed"/>
            {renderError('speed')}
          <input type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="Height"/>
            {renderError('height')}
          <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="Weight"/>
            {renderError('weight')}
          <input type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="Image"/>
            {renderError('image')}
          <fieldset>
                <legend>Choose your Pokemon's types*</legend>
                {types.map(type => { 
                    return <div key={type.id}>
                        <input type="checkbox" id={type.id} name="types" value={type.name} onChange={handleCheckbox}/>
                        <label htmlFor={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</label> 
                    </div>
                })}
            </fieldset>
                {renderError('types')}

          <button type="submit">Submit</button>
        </form>

        
      );
};

export default Form;