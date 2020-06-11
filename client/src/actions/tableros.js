import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_TABLEROS,
  RESET_TABLEROS,
  CREATE_SUCCESS,
  FOUND_ONE,
} from "./types";

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

export const getOne = (id) => async (dispatch) => {
  try {
    console.log("GET ONE: ", id);
    const tableros = await axios.get("/api/tablero/me/" + id);
    console.log(tableros.data);
    dispatch({
      type: FOUND_ONE,
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

export const postTableros = ({ name, desc }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, desc });
  try {
    await axios.post("/api/tablero", body, config);
    dispatch(getTableros());
    dispatch(setAlert("Tablero Creado", "success"));
    dispatch({
      type: CREATE_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const updateTablero = ({ name, desc, id }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, desc });
  try {
    await axios.patch("/api/tablero/" + id, body, config);
    dispatch(getTableros());
    dispatch(setAlert("Tablero Modificado", "success"));
    dispatch({
      type: CREATE_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const deleteTablero = (id) => async (dispatch) => {
  console.log("id: ", id);
  if (id) {
    try {
      await axios.delete("/api/tablero/" + id);
      dispatch(getTableros());
      dispatch(setAlert("Tablero Eliminado", "success"));
    } catch (err) {
      console.log(err);
    }
  }
};

export const resetTableros = () => async (dispatch) => {
  dispatch({
    type: RESET_TABLEROS,
  });
};
