import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "sideBarApis",
  initialState: {
    newsCategoryList: {},
    blogCategoryList: {},
    regionList: {},
    speciesList: {},
    speciesCategory: {},
    organizationList: {},
    zoo:{},
    scienceAndEducationCategory: {},
    scienceAndEducation: {},
    wetMarket:{},
    environmentalist:{},
    loading: false,
  },
  reducers: {
    newsCategoryListRequested: (misc, action) => {
      misc.loading = true;
    },
    newsCategoryListReceived: (misc, action) => {
      misc.newsCategoryList = action.payload;
      misc.loading = false;
    },
    newsCategoryListFailed: (misc, action) => {
      misc.loading = false;
    },

    regionListRequested: (misc, action) => {
      misc.loading = true;
    },
    regionListReceived: (misc, action) => {
      misc.regionList = action.payload;
      misc.loading = false;
    },
    regionListFailed: (misc, action) => {
      misc.loading = false;
    },

    blogCategoryListRequested: (misc, action) => {
      misc.loading = true;
    },
    blogCategoryListReceived: (misc, action) => {
      misc.blogCategoryList = action.payload;
      misc.loading = false;
    },
    blogCategoryListFailed: (misc, action) => {
      misc.loading = false;
    },

    speciesListRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesListReceived: (misc, action) => {
      misc.speciesList = action.payload;
      misc.loading = false;
    },
    speciesListFailed: (misc, action) => {
      misc.loading = false;
    },

    speciesCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesCategoryReceived: (misc, action) => {
      misc.speciesCategory = action.payload;
      misc.loading = false;
    },
    speciesCategoryFailed: (misc, action) => {
      misc.loading = false;
    },

    organizationListRequested: (misc, action) => {
      misc.loading = true;
    },
    organizationListReceived: (misc, action) => {
      misc.organizationList = action.payload;
      misc.loading = false;
    },
    organizationListFailed: (misc, action) => {
      misc.loading = false;
    },
    zooRequested: (misc, action) => {
      misc.loading = true;
    },
    zooReceived: (misc, action) => {
      misc.zoo = action.payload;
      misc.loading = false;
    },
    zooFailed: (misc, action) => {
      misc.loading = false;
    },

    scienceAndEducationCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    scienceAndEducationCategoryReceived: (misc, action) => {
      misc.scienceAndEducationCategory = action.payload;
      misc.loading = false;
    },
    scienceAndEducationCategoryFailed: (misc, action) => {
      misc.loading = false;
    },

     scienceAndEducationRequested: (misc, action) => {
      misc.loading = true;
    },
    scienceAndEducationReceived: (misc, action) => {
      misc.scienceAndEducation = action.payload;
      misc.loading = false;
    },
    scienceAndEducationFailed: (misc, action) => {
      misc.loading = false;
    },
    wetMarketRequested: (misc, action) => {
      misc.loading = true;
    },
    wetMarketReceived: (misc, action) => {
      misc.wetMarket = action.payload;
      misc.loading = false;
    },
    wetMarketFailed: (misc, action) => {
      misc.loading = false;
    },

    environmentalistRequested: (misc, action) => {
      misc.loading = true;
    },
    environmentalistReceived: (misc, action) => {
      misc.environmentalist = action.payload;
      misc.loading = false;
    },
    environmentalistFailed: (misc, action) => {
      misc.loading = false;
    },

  },
});

export const {
  newsCategoryListRequested,
  newsCategoryListReceived,
  newsCategoryListFailed,
  blogCategoryListRequested,
  blogCategoryListReceived,
  blogCategoryListFailed,
  speciesListRequested,
  speciesListReceived,
  speciesListFailed,
  speciesCategoryRequested,
  speciesCategoryReceived,
  speciesCategoryFailed,
  regionListRequested,
  regionListReceived,
  regionListFailed,
  organizationListRequested,
  organizationListReceived,
  organizationListFailed,
  zooRequested,
  zooReceived,
  zooFailed,
  scienceAndEducationCategoryRequested,
  scienceAndEducationCategoryReceived,
  scienceAndEducationCategoryFailed,
  scienceAndEducationRequested,
  scienceAndEducationReceived,
  scienceAndEducationFailed,
  wetMarketRequested,
  wetMarketReceived,
  wetMarketFailed,
  environmentalistRequested,
  environmentalistReceived,
  environmentalistFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "dropdown";

export const getRegionList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `region/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: regionListRequested.type,
      onSuccess: regionListReceived.type,
      onError: regionListFailed.type,
    })
  );
};

export const getSpeciesList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `species/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: speciesListRequested.type,
      onSuccess: speciesListReceived.type,
      onError: speciesListFailed.type,
    })
  );
};

export const getSpeciesCategoryList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `species/category/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: speciesCategoryRequested.type,
      onSuccess: speciesCategoryReceived.type,
      onError: speciesCategoryFailed.type,
    })
  );
};

export const getNewsCategoryList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `news/category/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: newsCategoryListRequested.type,
      onSuccess: newsCategoryListReceived.type,
      onError: newsCategoryListFailed.type,
    })
  );
};

export const getBLogCategoryList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `blog/category/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: blogCategoryListRequested.type,
      onSuccess: blogCategoryListReceived.type,
      onError: blogCategoryListFailed.type,
    })
  );
};

export const getOrganizationList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `organization/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: organizationListRequested.type,
      onSuccess: organizationListReceived.type,
      onError: organizationListFailed.type,
    })
  );
};

export const getZooList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `zoo/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: zooRequested.type,
      onSuccess: zooReceived.type,
      onError: zooFailed.type,
    })
  );
};

export const getScienceAndEducationCategory = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `scienceAndEducation/category/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: scienceAndEducationCategoryRequested.type,
      onSuccess:scienceAndEducationCategoryReceived.type,
      onError: scienceAndEducationCategoryFailed.type,
    })
  );
};

export const getScienceAndEducationList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `scienceAndEducation/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: scienceAndEducationRequested.type,
      onSuccess:scienceAndEducationReceived.type,
      onError: scienceAndEducationFailed.type,
    })
  );
};


export const getWetMarketList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `wetMarket/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: wetMarketRequested.type,
      onSuccess: wetMarketReceived.type,
      onError: wetMarketFailed.type,
    })
  );
};

export const getEnvironmentalistList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `environmentalist/${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: environmentalistRequested.type,
      onSuccess: environmentalistReceived.type,
      onError: environmentalistFailed.type,
    })
  );
};
export const sideBarApisListings = createSelector(
  (state) => state.entities.sideBarApis,
  (sideBarApis) => sideBarApis
);
