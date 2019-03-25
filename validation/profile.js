const Validator = require('validator');
const isEmpty = require('./is-empty');

// handle, status, skills are the only required fields.

const validateProfileInput = (data) => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.headline = !isEmpty(data.headline) ? data.headline : '';

  // handle errors
    if (!Validator.isLength(data.handle, { min: 2, max: 15 })) {
      errors.handle = 'Handle needs to between 2 and 15 characters';
    }

    if (Validator.isEmpty(data.handle)) {
      errors.handle = 'Profile handle is required';
    }

  // headline errors
    if (!Validator.isLength(data.headline, { min: 10, max: 100 })) {
      errors.headline = 'Headline needs to between 10 and 100 characters';
    }
    if (Validator.isEmpty(data.headline)) {
      errors.headline = 'Please fill out a headline'
    }

    if (Validator.isEmpty(data.headline)) {
      errors.headline = 'Please fill out a headline'
    }
 // status errors
    if (Validator.isEmpty(data.status)) {
      errors.status = 'Status field is required';
    }
  // skills errors

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  // country errors

  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country field is required';
  }

  // bio
  if(!isEmpty(data.bio)){
    if (!Validator.isLength(data.bio, {min: 70 })) {
      errors.bio = 'Your bio is too short. To skip the bio, leave blank.';
    }
    if (!Validator.isLength(data.bio, {max: 500 })) {
      errors.bio = 'Bio must not exceed 500 characters';
    }
  }

// social proof and website errors
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;