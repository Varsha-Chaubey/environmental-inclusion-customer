import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "zoo",
  initialState: {
    zoo: {},
    allZoo: [],
    loading: false,
  },
  reducers: {
    zooRequested: (misc, action) => {
      misc.loading = true;
    },
    zooReceived: (misc, action) => {
      misc.zoo = action.payload;
      misc.loading = false;
    },
    zooRequestFailed: (misc, action) => {
      misc.loading = false;
    },
    allZooRequested: (misc, action) => {
      misc.loading = true;
    },
    allZooReceived: (misc, action) => {
      misc.allZoo = action.payload?.data;
      misc.loading = false;
    },
    allZooRequestFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  zooRequested,
  zooReceived,
  zooRequestFailed,
  allZooRequested,
  allZooReceived,
  allZooRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "zoo";

export const getZoo = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: zooRequested.type,
      onSuccess: zooReceived.type,
      onError: zooRequestFailed.type,
    })
  );
};

export const getAllZoo = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/dropdown`,
      params,
      method: "get",
      callback,
      onStart: allZooRequested.type,
      onSuccess: allZooReceived.type,
      onError: allZooRequestFailed.type,
    })
  );
};

export const zooListings = createSelector(
  (state) => state.entities.zoo,
  (zoo) => zoo
);
