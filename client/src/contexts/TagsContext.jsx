import React, { createContext, useContext, useState } from 'react';

const TagsContext = createContext();

export function useTags() {
  return useContext(TagsContext);
}

export function TagsProvider({ children }) {
  const [tags, setTags] = useState([]);

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
}

