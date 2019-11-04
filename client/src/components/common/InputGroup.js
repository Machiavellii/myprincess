import React from 'react';
import classnames from 'classnames';

const InputGroup = ({
  name,
  value,
  placeholder,
  type,
  onChange,
  error,
  labels
}) => {
  const labelText = labels.map((label, index) => (
    <label htmlFor={label.htmlFor} key={index}>
      {label.text}
    </label>
  ));
  return (
    <div className="form-group">
      {labelText}
      <input
        type={type}
        name={name}
        className={classnames('form-control', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;
