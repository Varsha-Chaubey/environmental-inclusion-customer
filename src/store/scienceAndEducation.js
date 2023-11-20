import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "scienceAndEducation",
  initialState: {
    scienceAndEducation: {},
    scienceAndEducationDetail: {},
    loading: false,
  },
  reducers: {
    
  scienceAndEducationRequested: (misc, action) => {
      misc.loading = true;
    },
  scienceAndEducationReceived: (misc, action) => {
      misc.scienceAndEducation = action.payload;
      misc.loading = false;
    },
  scienceAndEducationRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    scienceAndEducationDetailRequested: (misc, action) => {
      misc.loading = true;
    },
  scienceAndEducationDetailReceived: (misc, action) => {
      misc.scienceAndEducationDetail = action.payload;
      misc.loading = false;
    },
  scienceAndEducationDetailRequestFailed: (misc, action) => {
      misc.loading = false;
    },

   
  },
});

export const {
  scienceAndEducationRequested,
  scienceAndEducationReceived,
  scienceAndEducationRequestFailed,
  scienceAndEducationDetailRequested,
  scienceAndEducationDetailReceived,
  scienceAndEducationDetailRequestFailed,
  
} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "scienceAndEducation";

export const getScienceAndEducation = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: scienceAndEducationRequested.type,
      onSuccess: scienceAndEducationReceived.type,
      onError: scienceAndEducationRequestFailed.type,
    })
  );
};
export const getScienceAndEducationDetail = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "get",
      callback,
      onStart: scienceAndEducationDetailRequested.type,
      onSuccess: scienceAndEducationDetailReceived.type,
      onError: scienceAndEducationDetailRequestFailed.type,
    })
  );
};


export const scienceAndEducationListing = createSelector(
  (state) => state.entities.scienceAndEducation,
  (scienceAndEducation) => scienceAndEducation
);
