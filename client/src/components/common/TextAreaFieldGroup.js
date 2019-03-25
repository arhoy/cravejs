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
  className,
  showCharactersRemaining,
  maxLength,
  showOnLength
}) => {
  return (
    <div className="form__group">
    {info && <small className="form__info">{info}</small>}
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
        { value.length >= showOnLength && showCharactersRemaining && <div className="form__info"> Max {maxLength - value.length} characters remaining! </div>}
        {error && <div className="form__error">{error}</div>}
      </div>
    
    </div>
  );
};

TextAreaFieldGroup.defaultProps = {
  className: 'form__textarea',
  cols: 10,
  rows: 3,
  showCharactersRemaining:false,
  maxLength: 0,
  showOnLength:0
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
