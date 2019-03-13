const Validator = require('validator');
const isEmpty = require('./is-empty');

// handle, status, skills are the only required fields.

const validateProductInput = (data) => {
  let errors = {};

  data.imageUrl = !isEmpty(data.imageUrl) ? data.imageUrl : '';
  data.longDescription = !isEmpty(data.longDescription) ? data.longDescription : '';


  if (Validator.isEmpty(data.name)) {
    errors.name = 'Product name is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Product description is required';
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price is required';
  }

 



  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProductInput;