import React from 'react';

const Button = ({ loading = false, texts = [], icon: Icon, onClick, type = "submit", disabled }) => {
  return (
    <button
      className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed font-semibold w-full md:w-1/3 mx-auto text-base md:text-lg flex justify-center items-center text-center transition duration-300 cursor-pointer py-2 rounded-lg"
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? texts[0] : texts[1]}
      {Icon && <Icon size={24} className="ml-1.5" />}
    </button>
  )
}

export default Button;