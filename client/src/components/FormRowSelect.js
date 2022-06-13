import React from "react";

const FormRowSelect = ({ name, value, handleChange, labelText, options }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-Label">
        {labelText || name}
      </label>
      <select
        value={value}
        name={name}
        onChange={handleChange}
        className="form-select"
      >
        {options.map((option, dex) => {
          return (
            <option key={dex} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
