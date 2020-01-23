import {
  GET_PROFILES,
  PROFILE_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  FILTER_PROFILE,
  SEARCHPAGE_FILTER,
  CLEAR_PROFILE,
  ACCOUNT_DELETED_ADMIN,
  GET_PROFILE_ADMIN,
  UPDATE_PROFILE_ADMIN,
  BLOCK_ACCOUNT,
  TOGGLE_ACTIVE
} from "../actions/type";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
  profileFilter: [],
  searchPage: [],
  block: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case TOGGLE_ACTIVE:
      return {
        ...state,
        profile: {
          ...state.profile,
          is_active: payload
        },
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case ACCOUNT_DELETED_ADMIN:
      return {
        ...state,
        profiles: state.profiles.filter(profile => profile.user._id !== payload)
      };
    case BLOCK_ACCOUNT:
      return {
        ...state,
        block: state.profiles.map(profile => profile.user.block.payload)
      };
    case GET_PROFILE_ADMIN:
    case UPDATE_PROFILE_ADMIN:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case FILTER_PROFILE:
      console.log(payload);
      return {
        ...state,
        profileFilter: state.profiles.filter(profile => {
          if (
            profile.user.nickname.toLowerCase().includes(payload) ||
            profile.location.city.toLowerCase().includes(payload)
          ) {
            return profile;
          }
        }),
        loading: false
      };
    case SEARCHPAGE_FILTER:
      return {
        ...state,
        searchPage: state.profiles.filter(profile => {
          const service = profile.services.map(service => {
            return service.toLowerCase();
          });

          if (
            typeof profile.location.canton === "string" &&
            profile.location.canton
              .toLowerCase()
              .includes(payload.canton.toLowerCase())
          ) {
            return profile;
          } else if (
            typeof profile.location.canton === "string" &&
            profile.location.canton
              .toLowerCase()
              .includes(payload.canton.toLowerCase()) &&
            profile.category
              .toLowerCase()
              .includes(payload.category.toLowerCase())
          ) {
            return profile;
          } else if (
            typeof profile.canton === "string" &&
            profile.canton
              .toLowerCase()
              .includes(payload.canton.toLowerCase()) &&
            profile.category
              .toLowerCase()
              .includes(payload.category.toLowerCase()) &&
            service.includes(payload.services.toLowerCase())
          ) {
            return profile;
          }
        })
      };

    default:
      return state;
  }
}
