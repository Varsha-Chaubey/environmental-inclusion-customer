import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "species",
  initialState: {
    speciesCategory: {},
    species: {},
    speciesDetail: {},
    organization: {},
    environmentalist: {},
    zoo: {},
    news: {},
    blog: {},
    donation: {},
    scienceAndEducation: {},
    region: {},
    media: {},
    loading: false,
  },
  reducers: {
    speciesCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesCategoryReceived: (misc, action) => {
      misc.speciesCategory = action.payload;
      misc.loading = false;
    },
    speciesCategoryRequestFailed: (misc, action) => {
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

    speciesDetailRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesDetailReceived: (misc, action) => {
      misc.speciesDetail = action.payload;
      misc.loading = false;
    },
    speciesDetailFailed: (misc, action) => {
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

    newsRequested: (misc, action) => {
      misc.loading = true;
    },
    newsReceived: (misc, action) => {
      misc.news = action.payload;
      misc.loading = false;
    },
    newsFailed: (misc, action) => {
      misc.loading = false;
    },

    blogRequested: (misc, action) => {
      misc.loading = true;
    },
    blogReceived: (misc, action) => {
      misc.blog = action.payload;
      misc.loading = false;
    },
    blogFailed: (misc, action) => {
      misc.loading = false;
    },

    organizationRequested: (misc, action) => {
      misc.loading = true;
    },
    organizationReceived: (misc, action) => {
      misc.organization = action.payload;
      misc.loading = false;
    },
    organizationFailed: (misc, action) => {
      misc.loading = false;
    },

    donationRequested: (misc, action) => {
      misc.loading = true;
    },
    donationReceived: (misc, action) => {
      misc.donation = action.payload;
      misc.loading = false;
    },
    donationFailed: (misc, action) => {
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

    regionRequested: (misc, action) => {
      misc.loading = true;
    },
    regionReceived: (misc, action) => {
      misc.region = action.payload;
      misc.loading = false;
    },
    regionFailed: (misc, action) => {
      misc.loading = false;
    },

    mediaRequested: (misc, action) => {
      misc.loading = true;
    },
    mediaReceived: (misc, action) => {
      misc.media = action.payload;
      misc.loading = false;
    },
    mediaFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  speciesCategoryRequested,
  speciesCategoryReceived,
  speciesCategoryRequestFailed,
  speciesRequested,
  speciesReceived,
  speciesRequestFailed,

  speciesDetailRequested,
  speciesDetailReceived,
  speciesDetailFailed,

  scienceAndEducationRequested,
  scienceAndEducationReceived,
  scienceAndEducationFailed,

  environmentalistRequested,
  environmentalistReceived,
  environmentalistFailed,

  organizationRequested,
  organizationReceived,
  organizationFailed,

  newsRequested,
  newsReceived,
  newsFailed,

  blogRequested,
  blogReceived,
  blogFailed,

  zooRequested,
  zooReceived,
  zooFailed,

  donationRequested,
  donationReceived,
  donationFailed,

  regionRequested,
  regionReceived,
  regionFailed,

  mediaRequested,
  mediaReceived,
  mediaFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "species";

export const getSpeciesCategory = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category`,
      method: "get",
      params,
      callback,
      onStart: speciesCategoryRequested.type,
      onSuccess: speciesCategoryReceived.type,
      onError: speciesCategoryRequestFailed.type,
    })
  );
};

export const getSpecies = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: speciesRequested.type,
      onSuccess: speciesReceived.type,
      onError: speciesRequestFailed.type,
    })
  );
};

export const getSpeciesDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "get",
      callback,
      onStart: speciesDetailRequested.type,
      onSuccess: speciesDetailReceived.type,
      onError: speciesDetailFailed.type,
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
      onError: organizationFailed.type,
    })
  );
};

export const getEnvironmentalist = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/environmentalist/${params}`,
      method: "get",
      callback,
      onStart: environmentalistRequested.type,
      onSuccess: environmentalistReceived.type,
      onError: environmentalistFailed.type,
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
      onError: zooFailed.type,
    })
  );
};

export const getScienceAndEducation = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/scienceAndEducation/${params}`,
      method: "get",
      callback,
      onStart: scienceAndEducationRequested.type,
      onSuccess: scienceAndEducationReceived.type,
      onError: scienceAndEducationFailed.type,
    })
  );
};

export const getNews = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/news/${params}`,
      method: "get",
      callback,
      onStart: newsRequested.type,
      onSuccess: newsReceived.type,
      onError: newsFailed.type,
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
      onError: blogFailed.type,
    })
  );
};

export const getDonation = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/donation/${params}`,
      method: "get",
      callback,
      onStart: donationRequested.type,
      onSuccess: donationReceived.type,
      onError: donationFailed.type,
    })
  );
};

export const getRegion = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/region/${params}`,
      method: "get",
      callback,
      onStart: regionRequested.type,
      onSuccess: regionReceived.type,
      onError: regionFailed.type,
    })
  );
};

export const getMedia = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/media/${params}`,
      method: "get",
      callback,
      onStart: mediaRequested.type,
      onSuccess: mediaReceived.type,
      onError: mediaFailed.type,
    })
  );
 
};

export const addDonationDetails = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/donation`,
      method: "POST",
      callback,
      data,
    })
  );
};

export const speciesListings = createSelector(
  (state) => state.entities.species,
  (species) => species
);
