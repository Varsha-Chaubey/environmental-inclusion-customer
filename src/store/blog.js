import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "blogs",
  initialState: {
    blogs: {},
    blogCategory:{},
    blogDetails: {},
    loading: false,
  },
  reducers: {
    
    blogRequested: (misc, action) => {
      misc.loading = true;
    },
    blogReceived: (misc, action) => {
      misc.blogs = action.payload;
      misc.loading = false;
    },
    blogRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    blogCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    blogCategoryReceived: (misc, action) => {
      misc.blogCategory = action.payload;
      misc.loading = false;
    },
    blogCategoryRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    blogDetailsRequested: (misc, action) => {
      misc.loading = true;
    },
    blogDetailsReceived: (misc, action) => {
      misc.blogDetails = action.payload.data;
      misc.loading = false;
    },
    blogDetailsRequestFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  blogRequested,
  blogReceived,
  blogRequestFailed,
  blogCategoryRequested,
  blogCategoryReceived,
  blogCategoryRequestFailed,
  blogDetailsRequested,
  blogDetailsReceived,
  blogDetailsRequestFailed
} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "blog";

export const getBlogs = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: blogRequested.type,
      onSuccess: blogReceived.type,
      onError: blogRequestFailed.type,
    })
  );
};

export const getBlogDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "get",
      callback,
      onStart: blogDetailsRequested.type,
      onSuccess: blogDetailsReceived.type,
      onError: blogDetailsRequestFailed.type,
    })
  );
};

export const getBlogCategory = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category`,
      method: "get",
      params,
      callback,
      onStart: blogCategoryRequested.type,
      onSuccess: blogCategoryReceived.type,
      onError: blogCategoryRequestFailed.type,
    })
  );
};

export const blogsListings = createSelector(
  (state) => state.entities.blogs,
  (blogs) => blogs
);
