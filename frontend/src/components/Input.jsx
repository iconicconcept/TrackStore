import React from "react";

const Input = ({ type, id, value, onChange, placeholder, htmlFor, label, icon }) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="mt-2 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          required
          value={value}
          onChange={onChange}
          className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
