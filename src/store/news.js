import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "news",
  initialState: {
    news: {},
    newsCategory:{},
    newsDetails: {},
    loading: false,
  },
  reducers: {
    
    newsRequested: (misc, action) => {
      misc.loading = true;
    },
    newsReceived: (misc, action) => {
      misc.news = action.payload;
      misc.loading = false;
    },
    newsRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    newsCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    newsCategoryReceived: (misc, action) => {
      misc.newsCategory = action.payload;
      misc.loading = false;
    },
    newsCategoryRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    newsDetailsRequested: (misc, action) => {
      misc.loading = true;
    },
    newsDetailsReceived: (misc, action) => {
      misc.newsDetails = action.payload.data;
      misc.loading = false;
    },
    newsDetailsRequestFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  newsRequested,
  newsReceived,
  newsRequestFailed,
  newsCategoryRequested,
  newsCategoryReceived,
  newsCategoryRequestFailed,
  newsDetailsRequested,
  newsDetailsReceived,
  newsDetailsRequestFailed
} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "news";

export const getNews = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: newsRequested.type,
      onSuccess: newsReceived.type,
      onError: newsRequestFailed.type,
    })
  );
};

export const getNewsDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "get",
      callback,
      onStart: newsDetailsRequested.type,
      onSuccess: newsDetailsReceived.type,
      onError: newsDetailsRequestFailed.type,
    })
  );
};

export const getNewsCategory = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category`,
      method: "get",
      params,
      callback,
      onStart: newsCategoryRequested.type,
      onSuccess: newsCategoryReceived.type,
      onError: newsCategoryRequestFailed.type,
    })
  );
};

export const newsListings = createSelector(
  (state) => state.entities.news,
  (news) => news
);
