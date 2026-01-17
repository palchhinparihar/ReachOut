import React from 'react'

const Input = ({ field, value, handleOnChange }) => {
  return (
    <>
      <label key={field?.type} className="font-semibold text-gray-900">{field?.name}</label>
      <input
        key={field?.type}
        className="border-b border-gray-300 mt-1 mb-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white rounded-md pl-1"
        type={field?.type}
        placeholder={field?.placeholder}
        value={value}
        onChange={e => handleOnChange(e, field?.type)}
        required
      />
    </>
  )
}

export default Input;