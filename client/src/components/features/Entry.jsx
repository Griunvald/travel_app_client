function Entry({ id, createdAt, textValue, urlValue, recordTags }) {
  return (
    <div>
      <p>{createdAt}</p>
      {recordTags && (
        <ul>
          {recordTags.map((tag) => (
            <li key={tag.id}>{tag.tagName}</li>
          ))}
        </ul>
      )}
      {textValue && (
        <p>{textValue}</p>
      )}
      {urlValue && (
        <img src={urlValue} alt="" />
      )}
    </div>
  );
}

export default Entry;

