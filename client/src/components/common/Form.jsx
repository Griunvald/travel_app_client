function Form({ children, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export default Form;
