function Input({ label, name, value, onChange, type = 'text' }) {
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <input 
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
