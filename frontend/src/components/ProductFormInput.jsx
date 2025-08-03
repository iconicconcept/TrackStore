
const ProductFormInput = ({  htmlFor,title, type, id, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300">
        {title}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
			px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        required
      />
    </div>
  );
};

export default ProductFormInput;
