import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "misc",
  initialState: {
    setting: {},
    Countries: {},
    usState: {},
    usCitiesItems:{},
    loading: false,
  },
  reducers: {
    settingRequested: (misc, action) => {
      misc.loading = true;
    },
    settingReceived: (misc, action) => {
      misc.setting = action.payload;
      misc.loading = false;
    },
    settingRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    countryRequested: (misc, action) => {
      misc.loading = true;
    },
    countryReceived: (misc, action) => {
      misc.Countries = action.payload;
      misc.loading = false;
    },
    countryRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    usStateRequested: (misc, action) => {
      misc.loading = true;
    },
    usStateReceived: (misc, action) => {
      misc.usState = action.payload;
      misc.loading = false;
    },
    usStateRequestFailed: (misc, action) => {
      misc.loading = false;
    },
    usCitiesRequested: (misc, action) => {
      misc.loading = true;
    },
    usCitiesReceived: (misc, action) => {
      misc.usCitiesItems = action.payload;
      misc.loading = false;
    },
    usCitiesFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  settingRequested,
  settingReceived,
  settingRequestFailed,
  countryRequested,
  countryReceived,
  countryRequestFailed,
  usStateRequested,
  usStateReceived,
  usStateRequestFailed,
  usCitiesRequested,
  usCitiesReceived,
  usCitiesFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const setting = "setting";

export const getSetting = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${setting}`,
      method: "get",
      callback,
      onStart: settingRequested.type,
      onSuccess: settingReceived.type,
      onError: settingRequestFailed.type,
    })
  );
};

export const getCountry = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/region/country/dropdown`,
      method: "get",
      callback,
      onStart: countryRequested.type,
      onSuccess: countryReceived.type,
      onError: countryRequestFailed.type,
    })
  );
};

export const getUsState = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/region/country/states/230`,
      method: "get",
      callback,
      onStart: usStateRequested.type,
      onSuccess: usStateReceived.type,
      onError: usStateRequestFailed.type,
    })
  );
};

export const getUsCitiesDropdown = (param,callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `country/cities/dropdown/${param.id}`,
      method: "get",
      callback,
      onStart: usCitiesRequested.type,
      onSuccess: usCitiesReceived.type,
      onError: usCitiesFailed.type,
    }),
  );
};

export const addSubscribe = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `emailSubscription/subscribe`,
      method: "POST",
      callback,
      data,
    })
  );
};
export const getMisc = createSelector(
  (state) => state.entities.misc,
  (misc) => misc
);
