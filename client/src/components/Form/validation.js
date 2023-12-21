

const validation = (formData) => {
  const errors = {};

  // Validar campos obligatorios
  for (const key in formData) {
    if (!formData[key]) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    }
  }

  // Validar longitud mínima para 'name'
  if (formData.name.length < 3) {
    errors.name = 'Name should be at least 3 characters long';
  }

  // Validar campos numéricos
  const numericFields = ['hp', 'attack', 'defense', 'speed', 'height', 'weight'];
  numericFields.forEach(field => {
    if (isNaN(formData[field]) || formData[field] <= 0) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} should be a valid number greater than zero`;
    }
  });

  return errors;
};

export default validation;