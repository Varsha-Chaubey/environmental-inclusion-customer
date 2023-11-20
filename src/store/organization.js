import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "organization",
  initialState: {
    organization: {},
    allOrganization: [],
    organizationDetail:{},
    workDetail:{},
    teamDetail:{},
    programDetail:{},
    partnerDetail:{},
    reportDetail:{},
    mediaDetail:{},
    loading: false,
  },
  reducers: {
    
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

    allOrganizationRequested: (misc, action) => {
      misc.loading = true;
    },
    allOrganizationReceived: (misc, action) => {
      misc.allOrganization = action.payload?.data;
      misc.loading = false;
    },
    allOrganizationRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    organizationDetailRequested: (misc, action) => {
      misc.loading = true;
    },
   organizationDetailReceived: (misc, action) => {
      misc.organizationDetail = action.payload;
      misc.loading = false;
    },
   organizationDetailRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    workDetailRequested: (misc, action) => {
      misc.loading = true;
    },
   workDetailReceived: (misc, action) => {
      misc.workDetail = action.payload;
      misc.loading = false;
    },
   workDetailRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    teamDetailRequested: (misc, action) => {
      misc.loading = true;
    },
   teamDetailReceived: (misc, action) => {
      misc.teamDetail = action.payload;
      misc.loading = false;
    },
   teamDetailRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    programDetailRequested: (misc, action) => {
      misc.loading = true;
    },
   programDetailReceived: (misc, action) => {
      misc.programDetail = action.payload;
      misc.loading = false;
    },
   programDetailRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    partnerDetailRequested: (misc, action) => {
      misc.loading = true;
    },
   partnerDetailReceived: (misc, action) => {
      misc.partnerDetail = action.payload;
      misc.loading = false;
    },
   partnerDetailRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    reportDetailRequested: (misc, action) => {
      misc.loading = true;
    },
   reportDetailReceived: (misc, action) => {
      misc.reportDetail = action.payload;
      misc.loading = false;
    },
   reportDetailRequestFailed: (misc, action) => {
      misc.loading = false;
    },

    mediaDetailRequested: (misc, action) => {
      misc.loading = true;
    },
   mediaDetailReceived: (misc, action) => {
      misc.mediaDetail = action.payload;
      misc.loading = false;
    },
   mediaDetailRequestFailed: (misc, action) => {
      misc.loading = false;
    },

  },
});

export const {
  organizationRequested,
  organizationReceived,
  organizationRequestFailed,
  allOrganizationRequested,
  allOrganizationReceived,
  allOrganizationRequestFailed,
  organizationDetailRequested,
  organizationDetailReceived,
  organizationDetailRequestFailed,
  

  workDetailRequested,
  workDetailReceived,
  workDetailRequestFailed,

  teamDetailRequested,
  teamDetailReceived,
  teamDetailRequestFailed,

  programDetailRequested,
  programDetailReceived,
  programDetailRequestFailed,

  partnerDetailRequested,
  partnerDetailReceived,
  partnerDetailRequestFailed,

  reportDetailRequested,
  reportDetailReceived,
  reportDetailRequestFailed,

  mediaDetailRequested,
  mediaDetailReceived,
  mediaDetailRequestFailed,

 
} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "organization";

export const getOrganization = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: organizationRequested.type,
      onSuccess: organizationReceived.type,
      onError: organizationRequestFailed.type,
    })
  );
};

export const getAllOrganization = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/dropdown`,
      params,
      method: "get",
      callback,
      onStart: allOrganizationRequested.type,
      onSuccess: allOrganizationReceived.type,
      onError: allOrganizationRequestFailed.type,
    })
  );
};

export const getOrganizationDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "get",
      callback,
      onStart: organizationDetailRequested.type,
      onSuccess: organizationDetailReceived.type,
      onError: organizationDetailRequestFailed.type,
    })
  );
};

export const getWorkDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/work/${params}`,
      method: "get",
      callback,
      onStart: workDetailRequested.type,
      onSuccess: workDetailReceived.type,
      onError: workDetailRequestFailed.type,
    })
  );
};

export const getTeamDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/team/${params}`,
      method: "get",
      callback,
      onStart: teamDetailRequested.type,
      onSuccess: teamDetailReceived.type,
      onError: teamDetailRequestFailed.type,
    })
  );
};

export const getProgramDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/program/${params}`,
      method: "get",
      callback,
      onStart: programDetailRequested.type,
      onSuccess: programDetailReceived.type,
      onError: programDetailRequestFailed.type,
    })
  );
};

export const getPartnerDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/partner/${params}`,
      method: "get",
      callback,
      onStart: partnerDetailRequested.type,
      onSuccess: partnerDetailReceived.type,
      onError: partnerDetailRequestFailed.type,
    })
  );
};

export const getReportDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/report/${params}`,
      method: "get",
      callback,
      onStart: reportDetailRequested.type,
      onSuccess: reportDetailReceived.type,
      onError: reportDetailRequestFailed.type,
    })
  );
};

export const getMediaDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/media/${params}`,
      method: "get",
      callback,
      onStart: mediaDetailRequested.type,
      onSuccess: mediaDetailReceived.type,
      onError: mediaDetailRequestFailed.type,
    })
  );
};


export const organizationListing = createSelector(
  (state) => state.entities.organization,
  (organization) => organization
);
