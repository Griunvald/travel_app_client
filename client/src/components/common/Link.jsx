function Link({ name, path, newTab = false }) {
  return (
    <a 
      href={path} 
      className="underline decoration-solid font-medium"
      target={newTab ? "_blank" : "_self"} 
      rel={newTab ? "noopener noreferrer" : ""}
    >
      {name}
    </a>
  );
}

export default Link;

