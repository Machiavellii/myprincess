import React from "react";

const InputGroup = ({ name, value, placeholder, type, onChange, labels }) => {
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
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
