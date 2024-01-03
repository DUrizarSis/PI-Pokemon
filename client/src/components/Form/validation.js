const validation = (formData) => {

  const errors = {};

  // Validate required fields
  for (const key in formData) {
    if (!formData[key]) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    }
  }

  // Validate minimum length for 'name'
  if (formData.name.length < 3) {
    errors.name = 'Name should be at least 3 characters long';
  }

  // Validate image URL
  const urlPattern = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  if (!urlPattern.test(formData.image)) {
      errors.image = 'Enter a valid image URL';
  } 

  // Validate numeric fields
  const numericFields = ['hp', 'attack', 'defense', 'speed', 'height', 'weight'];
  numericFields.forEach(field => {
    if (isNaN(formData[field]) || formData[field] <= 0) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} should be greater than zero`;
    }
  });

  // Validate that exactly two types are selected
  if (formData.types.length !== 2) {
    errors.types = 'Select exactly two types';
  }

  return errors;
};

export default validation;