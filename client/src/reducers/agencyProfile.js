import {
  AGENCY_ERROR,
  GET_AGENCY_PROFILE,
  UPLOAD_AGENCY_COVER,
  UPLOAD_AGENCY_GALLERY,
  AGENCY_TOGGLE_ACTIVE,
  CLEAR_AGENCY,
  GET_AGENCY_PROFILES
} from "../actions/type";

const initialState = {
  agency: null,
  agencies: [],
  loading: true,
  error: {},
  agencyFilter: [],
  searchPage: [],
  block: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AGENCY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_AGENCY_PROFILE:
      return {
        ...state,
        agency: payload,
        loading: false
      };
    case GET_AGENCY_PROFILES:
      return {
        ...state,
        agencies: payload,
        loading: false
      };
    case AGENCY_TOGGLE_ACTIVE:
      return {
        ...state,
        agency: {
          ...state.agency,
          is_active: payload
        },
        loading: false
      };
    case UPLOAD_AGENCY_COVER:
      return {
        ...state,
        agency: {
          ...state.agency,
          cover_photo: payload
        },
        loading: false
      };
    case UPLOAD_AGENCY_GALLERY:
      return {
        ...state,
        agency: {
          ...state.agency,
          photos: [payload]
        },
        loading: false
      };
    case CLEAR_AGENCY:
      return {
        ...state,
        agency: null,
        loading: false
      };
    default:
      return state;
  }
}
