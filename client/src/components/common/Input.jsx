function Input({ label, name, value, onChange, type = 'text' }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input 
        className="mb-4"
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
