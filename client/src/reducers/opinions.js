import { GET_OPINIONS, ADD_OPINIONS, OPINION_ERROR } from "../actions/type";

const initialState = {
  opinions: [],
  opinion: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OPINIONS:
      return {
        ...state,
        opinions: payload,
        loading: false
      };
    case OPINION_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case ADD_OPINIONS:
      return {
        ...state,
        opinions: [payload, ...state.opinions],
        loading: false
      };
    default:
      return state;
  }
}
