import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({ name, value, error, onChange, options, labels }) => {
  const selectOption = options.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  const labelText = labels.map((label, index) => (
    <label htmlFor={label.htmlFor} key={index}>
      {label.text}
    </label>
  ));

  return (
    <div className="form-group">
      {labelText}
      <select
        className={classnames('form-control', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option> -- </option>
        {selectOption}
      </select>

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
