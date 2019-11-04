import React from 'react';
import classnames from 'classnames';

const CheckBoxInput = ({
  name,
  value,
  type,
  onChange,
  error,
  labels,
  options
}) => {
  const labelText = labels.map((label, index) => (
    <label htmlFor={label.htmlFor} key={index}>
      {label.text}
    </label>
  ));
  return (
    <div className="form-group col-md-12">
      {labelText} <br />
      {options.map((option, index) => (
        <div
          className="form-check form-check-inline dynamic-checkbox"
          key={index}
        >
          <input
            className={classnames('form-check-input', {
              'is-invalid': error
            })}
            type={type}
            value={option}
            onChange={onChange}
            name={name}
          />
          <label
            className="form-check-label dynamic-checkbox-label ml-2"
            htmlFor={option}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

CheckBoxInput.defaultProps = {
  type: 'checkbox'
};

export default CheckBoxInput;
