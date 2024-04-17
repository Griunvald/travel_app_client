import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  currentTag: '',
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    // Modify to handle adding a single tag
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },
    addCurrentTag: (state, action) => {
      state.currentTag = action.payload;
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter(tag => tag !== action.payload);
    },
    clearTags: (state) => {
      state.tags = [];
    }

  }
});

export const { addTag, addCurrentTag, removeTag, clearTags } = tagsSlice.actions;

export default tagsSlice.reducer;

