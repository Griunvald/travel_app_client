function Textarea({ label, name, value, onChange, height, rows = 5, cols = 40 }) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-800" htmlFor={name}>{label}</label>}
      <textarea
        className={`mb-4 resize-none overflow-hidden h-${height}`}
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        value={value}
        height={height}
        onChange={onChange}
      />
    </div>
  );
}

export default Textarea;
