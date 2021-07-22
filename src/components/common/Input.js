import React from 'react';

const Input = ({ name, onChange, strings, type = 'text', value }) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {strings?.[name]}
      </label>
      <input
        className="form-control"
        id={name}
        key={name}
        name={name}
        onChange={onChange}
        placeholder={strings?.[name]}
        type={type}
        value={value}
      />
    </>
  );
};

export default Input;
