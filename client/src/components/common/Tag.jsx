const Tag = ({ label, onRemove }) => {
  return (
    <span className="tag">
      {label}
      <button onClick={onRemove}>x</button>
    </span>
  );
};

export default Tag;

