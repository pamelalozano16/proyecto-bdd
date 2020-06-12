import {
  GET_TABLEROS,
  RESET_TABLEROS,
  CREATE_SUCCESS,
  FOUND_ONE,
} from "../actions/types";

const initialState = {
  tableros: [],
  newCreated: false,
  tablero: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  /*
    Payload:
   image_results array
    */
  switch (type) {
    case FOUND_ONE:
      return {
        ...state,
        tablero: payload,
      };
    case CREATE_SUCCESS:
      return { ...state, newCreated: false };
    case GET_TABLEROS:
      return {
        ...state,
        tableros: payload,
      };
    default:
      return state;
  }
}
