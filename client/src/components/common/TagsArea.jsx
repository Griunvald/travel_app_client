import { useDispatch, useSelector } from 'react-redux';
import { addTag, addCurrentTag, removeTag } from '../../features/tag/tagsSlice';
import Tag from './Tag';

const TagsArea = () => {
  const dispatch = useDispatch();
  const { tags, currentTag } = useSelector(store => store.tag);

  const handleAddTag = () => {
    const newTag = currentTag.trim().toLowerCase().replace(/\s+/g, '-');
    if (newTag !== '' && !tags.includes(newTag)) {
      dispatch(addTag(newTag));  // Dispatch single tag addition
      dispatch(addCurrentTag(''));
    }
  };

  const handleInputChange = (e) => {
    const formattedTag = e.target.value.toLowerCase().replace(/\s+/g, '');
    dispatch(addCurrentTag(formattedTag));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    dispatch(removeTag(tagToRemove));  // Dispatch tag removal
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
          spellCheck="false"
          className="flex-auto bg-transparent outline-none border-0 focus:ring-0 p-1"
        />
      </div>
    </div>
  );
};

export default TagsArea;

