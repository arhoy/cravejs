const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateReplyInput = (data) => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';


  if (!Validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = 'Reply cannot be empty';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = `Text field is required!`;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateReplyInput;