function Input({ label, name, value, onChange, type = 'text' }) {
  return (
    <>
      <label className="text-gray-800" htmlFor={name}>{label}</label>
      <input 
        className="mb-4 border border-secondary"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default Input;
