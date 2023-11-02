import { useState } from 'react';
import Tag from './Tag';
import { useTags } from '../../contexts/TagsContext';

const TagsArea = () => {
  const { tags, setTags } = useTags();
  const [currentTag, setCurrentTag] = useState('');

    const handleAddTag = () => {
      const newTag = currentTag.trim().toLowerCase().replace(/\s+/g, '-');
      if (newTag !== '' && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setCurrentTag('');
  }
};


const handleInputChange = (e) => {
  const formattedTag = e.target.value.toLowerCase().replace(/\s+/g, '');
  setCurrentTag(formattedTag);
};


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove); 
    setTags(newTags);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative flex flex-wrap items-center p-2 space-x-2 border border-primary bg-white">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} onRemove={() => handleRemoveTag(tag)} />
        ))}
        <input 
          type="text"
          value={currentTag}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag"
          className="flex-auto bg-transparent outline-none border-0 focus:ring-0 p-1"
        />
      </div>
    </div>
  );
};

export default TagsArea;

