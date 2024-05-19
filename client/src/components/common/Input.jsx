function Input({ label, name, value, onChange, type = 'text', error }) {
  return (
    <div className="mb-4">
      <label className="text-gray-800" htmlFor={name}>{label}</label>
      <input
        className={`border ${error ? 'border-red-500' : 'border-secondary'} w-full p-2`}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default Input;


