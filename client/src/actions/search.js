import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

import { SEARCH_FAIL, SEARCH_SUCCESS, SEARCH_RESET } from "./types";

export const search = ({ type, phrase }) => async (dispatch) => {
  console.log(phrase, type);
  const config = {
    headers: {
      apikey: "21889d40-aa8b-11ea-92bc-41776a8fe9ce",
    },
  };
  try {
    const res = await axios.get(
      "https://app.zenserp.com/api/v2/search?q=" +
        phrase +
        "&tbm=isch&location=United+States&search_engine=google.com&hl=en&gl=US&device=desktop",
      config
    );
    // const res = await axios.get("/api/auth/try");
    console.log(res);
    console.log(res.data.image_results);
    dispatch({
      type: SEARCH_RESET,
    });
    dispatch({
      type: SEARCH_SUCCESS,
      payload: res.data.image_results,
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: SEARCH_FAIL,
    });
  }
};
