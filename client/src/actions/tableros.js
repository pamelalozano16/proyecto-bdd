import axios from "axios";
import { setAlert } from "./alert";

import { GET_TABLEROS, RESET_TABLEROS } from "./types";

export const getTableros = () => async (dispatch) => {
  try {
    const tableros = await axios.get("/api/tablero");
    console.log(tableros.data);
    dispatch({
      type: GET_TABLEROS,
      payload: tableros.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    console.log(err);
    dispatch({
      type: RESET_TABLEROS,
    });
  }
};

export const resetTableros = () => async (dispatch) => {
  dispatch({
    type: RESET_TABLEROS,
  });
};
