import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  cols,
  rows,
  className
}) => {
  return (
    <div className="form__group">
      <textarea
        className= {className}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        cols = {cols}
        rows = {rows}
      />
      <div>
        {info && <small className="form__info">{info}</small>}
        {error && <div className="form__error">{error}</div>}
      </div>
    
    </div>
  );
};

TextAreaFieldGroup.defaultProps = {
  className: 'form__textarea',
  cols: 10,
  rows: 3
}
TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
