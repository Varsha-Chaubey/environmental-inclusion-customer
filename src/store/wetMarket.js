import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "wetMarket",
  initialState: {
    wetMarket: {},
    loading: false,
  },
  reducers: {
    wetmarketRequested: (misc, action) => {
      misc.loading = true;
    },
    wetmarketReceived: (misc, action) => {
      misc.wetMarket = action.payload;
      misc.loading = false;
    },
    wetmarketRequestFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const { wetmarketRequested, wetmarketReceived, wetmarketRequestFailed } =
  slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "wetMarket";

export const getwetmarket = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: wetmarketRequested.type,
      onSuccess: wetmarketReceived.type,
      onError: wetmarketRequestFailed.type,
    })
  );
};

export const wetMarketData = createSelector(
  (state) => state.entities.wetMarket,
  (wetMarket) => wetMarket
);
