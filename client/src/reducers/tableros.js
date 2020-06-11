import { GET_TABLEROS, RESET_TABLEROS } from "../actions/types";

const initialState = {
  tableros: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  /*
    Payload:
   image_results array
    */
  switch (type) {
    case GET_TABLEROS:
      return {
        ...state,
        tableros: payload,
      };
    case RESET_TABLEROS:
      return {
        ...state,
        gallery: [],
      };
    default:
      return state;
  }
}
