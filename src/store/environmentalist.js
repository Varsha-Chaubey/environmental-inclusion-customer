import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "environmentalist",
  initialState: {
    environmentalist: {},
    allEnvironmentalist: [],
    environmentalistDetail:{},
    loading: false,
  },
  reducers: {
    environmentalistRequested: (misc, action) => {
      misc.loading = true;
    },
    environmentalistReceived: (misc, action) => {
      misc.environmentalist = action.payload;
      misc.loading = false;
    },
    environmentalistRequestFailed: (misc, action) => {
      misc.loading = false;
    },
    allEnvironmentalistRequested: (misc, action) => {
      misc.loading = true;
    },
    allEnvironmentalistReceived: (misc, action) => {
      misc.allEnvironmentalist = action.payload?.data;
      misc.loading = false;
    },
    allEnvironmentalistRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    environmentalistDetailRequested: (misc, action) => {
      misc.loading = true;
    },
    environmentalistDetailReceived: (misc, action) => {
      misc.environmentalistDetail = action.payload;
      misc.loading = false;
    },
    environmentalistDetailRequestFailed: (misc, action) => {
      misc.loading = false;
    },

  },
});

export const {
  environmentalistRequested,
  environmentalistReceived,
  environmentalistRequestFailed,
  allEnvironmentalistRequested,
  allEnvironmentalistReceived,
  allEnvironmentalistRequestFailed,
  environmentalistDetailRequested,
  environmentalistDetailReceived,
  environmentalistDetailRequestFailed,

} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "environmentalist";

export const getEnvironmentalist = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart:environmentalistRequested.type,
      onSuccess:environmentalistReceived.type,
      onError:environmentalistRequestFailed.type,
    })
  );
};

export const getAllEnvironmentalist = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/dropdown`,
      params,
      method: "get",
      callback,
      onStart: allEnvironmentalistRequested.type,
      onSuccess: allEnvironmentalistReceived.type,
      onError: allEnvironmentalistRequestFailed.type,
    })
  );
};

export const getEnvironmentalistDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "get",
      callback,
      onStart: environmentalistDetailRequested.type,
      onSuccess: environmentalistDetailReceived.type,
      onError: environmentalistDetailRequestFailed.type,
    })
  );
};


export const environmentalistListings = createSelector(
  (state) => state.entities.environmentalist,
  (environmentalist) => environmentalist
);
