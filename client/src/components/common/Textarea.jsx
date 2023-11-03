function Textarea({
  label,
  name,
  value,
  onChange,
  height,
  rows = 5,
  maxLength,
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-gray-800">{label}</label>
      )}
      <div className="relative">
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={`resize-none overflow-hidden bg-white shadow-sm mt-1 block w-full mb-4  h-${height}`}
        />
        {maxLength && (
          <span className="absolute bottom-2 right-2 pb-5 text-sm text-gray-600">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

export default Textarea;
