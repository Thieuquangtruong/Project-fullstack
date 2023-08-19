import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  post: {},
  selected:{}
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      toast.success("Đăng xuất thành công")
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    createPost: (state, action) => {
      state.posts = [action.payload.posts, ...state.posts]
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts?.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      console.log(updatedPosts)
      state.posts = updatedPosts;
    },
    deletePost: (state, action) => {
      const updatedPosts = state.posts.filter((post) => { return post._id !== action.payload.id });
      state.posts = updatedPosts;
    },
    getPostById: (state, action) => {
      const result = state.posts.filter((post) => { return post._id === action.payload.id });
      state.post = result;
    },
    selectPost: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, createPost, deletePost, getPostById,selectPost } =
  authSlice.actions;
export default authSlice.reducer;
