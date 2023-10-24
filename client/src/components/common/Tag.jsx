const Tag = ({ label, onRemove }) => {
  return (
    <span className="text-sm tag border solid rounded-xl px-2.5 py-1  m-1 bg-secondary">
      {label}
      <button className="ml-1" onClick={onRemove}>x</button>
    </span>
  );
};

export default Tag;

