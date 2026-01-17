import React from 'react';

const Button = ({ loading, texts=[], icon: Icon }) => {
  return (
    <button
      className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold w-full md:w-1/3 mx-auto text-base md:text-lg flex justify-center items-center text-center transition duration-300 cursor-pointer py-2 rounded-lg"
      type="submit"
      disabled={loading}
    >
      {loading ? texts[0] : texts[1]}
      {Icon && <Icon size={24} className="ml-1.5" />}
    </button>
  )
}

export default Button;