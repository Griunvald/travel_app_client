import { createAsyncThunk } from '@reduxjs/toolkit';

export const getComments = createAsyncThunk(
  'comment/getComments',
  async (tripId, thunkApi) => {
    const url = `http://localhost:3003/api/v1/comments/${tripId}`
    try {
      const response = await fetch(url);
      if (response.ok) {
        const comments = await response.json()
        return comments;
      } else {
        console.error('Failed to get comments');
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);


export const addComment = createAsyncThunk(
  'comment/addComment',
  async ({ tripId, comment }, thunkApi) => {
    const url = `http://localhost:3003/api/v1/comments/${tripId}`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ body: comment })
      });
      if (response.ok) {
        const comment = await response.json()
        return comment;
      } else {
        console.error('Failed to create comment');
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);


export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async ({ commentId, commentOwner }, thunkApi) => {
    const url = `http://localhost:3003/api/v1/comments/${commentId}/${commentOwner}`
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const comment = await response.json()
        return comment;
      } else {
        console.error('Failed to delete comment');
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const editComment = createAsyncThunk(
  'comment/editComment',
  async ({ commentId, commentOwner, comment }, thunkApi) => {
    const url = `http://localhost:3003/api/v1/comments/${commentId}/${commentOwner}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ body: comment })
      });
      if (response.ok) {
        const updatedComment = await response.json();
        return updatedComment;
      } else {
        console.error('Failed to update comment');
        return thunkApi.rejectWithValue('Failed to update comment');
      }
    } catch (err) {
      console.error('Error updating comment:', err);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

