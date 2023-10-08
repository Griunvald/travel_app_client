function Textarea({ label, name, value, onChange, rows = 5, cols = 40 }) {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        className="mb-4 resize-none overflow-hidden"
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
