import { SEARCH_FAIL, SEARCH_SUCCESS, SEARCH_RESET } from "../actions/types";

const initialState = {
  gallery: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  /*
    Payload:
   image_results array
    */
  switch (type) {
    case SEARCH_SUCCESS:
      return {
        ...state,
        gallery: payload,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        gallery: [],
      };
    default:
      return state;
  }
}
