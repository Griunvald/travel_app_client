import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags:  [],
  currentTag:'',
}
export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTags: (state, action ) => {
      state.tags.push(action.payload);
    },
    addCurrentTag: (state, action ) => {
      state.currentTag = action.payload;
    }
  }
});
 

export const { addTags, addCurrentTag } = tagsSlice.actions;
export default tagsSlice.reducer;

