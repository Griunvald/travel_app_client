function Textarea({ label, name, value, onChange, rows = 5, cols = 40 }) {
  return (
    <div className="textarea-wrapper">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Textarea;
