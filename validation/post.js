const Validator = require('validator');
const isEmpty = require('./is-empty');

const validatePostInput = (data) => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';


  if (!Validator.isLength(data.text, { min: 2 })) {
    errors.text = 'Post must at least two characters!';
  }

  if (!Validator.isLength(data.text, { max: 2000 })) {
    errors.text = 'Post must be under 200 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = `Text field is required!`;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validatePostInput;