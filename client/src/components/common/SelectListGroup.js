import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form__group">
      {info && <small className="form__info">{info}</small>}
      <select
        className="form__select" 
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
    
      {error && <div className="form__error">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
