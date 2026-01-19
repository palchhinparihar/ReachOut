import React from 'react';

const Input = ({ field, value, handleOnChange, isShowLabel = true }) => {
  return (
    <>
      {isShowLabel && (
        <label className="font-semibold text-gray-300">
          {field?.label || field?.name}
        </label>
      )}

      <input
        className="border-b border-gray-300 mt-1 mb-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md pl-1"
        type={field?.type || 'text'}
        placeholder={field?.placeholder}
        value={value ?? ''}                 
        min={field?.min}
        onChange={handleOnChange}
        required={field?.required}
      />
    </>
  );
};

export default Input;
