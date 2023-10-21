import { useState } from 'react';
import Tag from './Tag';

const TagsArea = () => {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (currentTag.trim() !== '' && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative flex flex-wrap items-center p-2 space-x-2 border rounded bg-white">
        {tags.map((tag, index) => (
          <Tag key={index} label={tag} onRemove={() => handleRemoveTag(index)} />
        ))}
        <input 
          type="text"
          value={currentTag}
          onChange={e => setCurrentTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag"
          className="flex-auto bg-transparent outline-none border-0 focus:ring-0 p-1"
        />
      </div>
      <div>
        <button type="button" onClick={handleAddTag} className="mr-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add Tag</button>
      </div>
    </div>
  );
};

export default TagsArea;

