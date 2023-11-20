import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "region",
  initialState: {
    regionList: {},
    regionDetails: {},
    wetMarkets: {},
    zoo: {},
    species: {},
    organization: {},
    blog: {},
    news: {},
    loading: false,
    scienceAndEducation: {},
  },
  reducers: {
    regionRequested: (misc, action) => {
      misc.loading = true;
    },
    regionReceived: (misc, action) => {
      misc.regionList = action.payload;
      misc.loading = false;
    },
    regionRequestFailed: (misc, action) => {
      misc.loading = false;
    },
    regionDetailsRequested: (misc, action) => {
      misc.loading = true;
    },
    regionDetailsReceived: (misc, action) => {
      misc.regionDetails = action.payload.data;
      misc.loading = false;
    },
    regionDetailsRequestFailed: (misc, action) => {
      misc.loading = false;
    },
    wetMarketsRequested: (misc, action) => {
      misc.loading = true;
    },
    wetMarketsReceived: (misc, action) => {
      misc.wetMarkets = action.payload.data;
      misc.loading = false;
    },
    wetMarketsRequestFailed: (misc, action) => {
      misc.loading = false;
    },
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

    speciesRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesReceived: (misc, action) => {
      misc.species = action.payload;
      misc.loading = false;
    },
    speciesRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    organizationRequested: (misc, action) => {
      misc.loading = true;
    },
    organizationReceived: (misc, action) => {
      misc.organization = action.payload;
      misc.loading = false;
    },
    organizationRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    blogRequested: (misc, action) => {
      misc.loading = true;
    },
    blogReceived: (misc, action) => {
      misc.blog = action.payload;
      misc.loading = false;
    },
    blogRequestFailed: (misc, action) => {
      misc.loading = false;
    },
    newRequested: (misc, action) => {
      misc.loading = true;
    },
    newReceived: (misc, action) => {
      misc.news = action.payload;
      misc.loading = false;
    },
    newRequestFailed: (misc, action) => {
      misc.loading = false;
    },
    scienceEducationRequested: (misc, action) => {
      misc.loading = true;
    },
    scienceEducationReceived: (misc, action) => {
      misc.scienceAndEducation = action.payload;
      misc.loading = false;
    },
    scienceEducationRequestFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  regionRequested,
  regionReceived,
  regionRequestFailed,
  regionDetailsRequested,
  regionDetailsReceived,
  regionDetailsRequestFailed,
  wetMarketsRequested,
  wetMarketsReceived,
  wetMarketsRequestFailed,
  zooRequested,
  zooReceived,
  zooRequestFailed,
  speciesRequested,
  speciesReceived,
  speciesRequestFailed,
  organizationRequested,
  organizationReceived,
  organizationRequestFailed,
  blogRequested,
  blogReceived,
  blogRequestFailed,
  newRequested,
  newReceived,
  newRequestFailed,
  scienceEducationRequested,
  scienceEducationRequestFailed,
  scienceEducationReceived,
} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "region";

export const getRegion = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: regionRequested.type,
      onSuccess: regionReceived.type,
      onError: regionRequestFailed.type,
    })
  );
};

export const getRegionDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "get",
      callback,
      onStart: regionDetailsRequested.type,
      onSuccess: regionDetailsReceived.type,
      onError: regionDetailsRequestFailed.type,
    })
  );
};

export const getWetMarkets = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/wetMarket/${params}`,
      data,
      method: "get",
      callback,
      onStart: wetMarketsRequested.type,
      onSuccess: wetMarketsReceived.type,
      onError: wetMarketsRequestFailed.type,
    })
  );
};

export const getZoo = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/zoo/${params}`,
      method: "get",
      callback,
      onStart: zooRequested.type,
      onSuccess: zooReceived.type,
      onError: zooRequestFailed.type,
    })
  );
};

export const getSpecies = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/species/${params}`,
      method: "get",
      callback,
      onStart: speciesRequested.type,
      onSuccess: speciesReceived.type,
      onError: speciesRequestFailed.type,
    })
  );
};

export const getOrganizations = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/organization/${params}`,
      method: "get",
      callback,
      onStart: organizationRequested.type,
      onSuccess: organizationReceived.type,
      onError: organizationRequestFailed.type,
    })
  );
};

export const getBlog = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/blog/${params}`,
      method: "get",
      callback,
      onStart: blogRequested.type,
      onSuccess: blogReceived.type,
      onError: blogRequestFailed.type,
    })
  );
};

export const getNews = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/news/${params}`,
      method: "get",
      callback,
      onStart: newRequested.type,
      onSuccess: newReceived.type,
      onError: newRequestFailed.type,
    })
  );
};

export const getScienceEducation = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/scienceAndEducation/${params}`,
      method: "get",
      callback,
      onStart: scienceEducationRequested.type,
      onSuccess: scienceEducationReceived.type,
      onError: scienceEducationRequestFailed.type,
    })
  );
};

export const regionListings = createSelector(
  (state) => state.entities.region,
  (region) => region
);
