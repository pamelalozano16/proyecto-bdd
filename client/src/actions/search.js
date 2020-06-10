import axios from "axios";
import { setAlert } from "./alert";

import { SEARCH_FAIL, SEARCH_SUCCESS, SEARCH_RESET } from "./types";

export const search = ({ type, phrase }) => async (dispatch) => {
  console.log(phrase, type);
  if (type === "img") {
    try {
      const res = await axios.get(
        "https://api.unsplash.com/search/photos/?client_id=Oiu86ebjvSZNcgfOBp8ES3lmUtRKw4U_7QDoeAE7u6k&page=1&per_page=30&query=" +
          phrase
      );

      console.log(res);
      dispatch({
        type: SEARCH_RESET,
      });
      dispatch({
        type: SEARCH_SUCCESS,
        payload: res.data.results,
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
  } else {
    try {
      const config = {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "ali-express1.p.rapidapi.com",
          "x-rapidapi-key":
            "0e6f6e6dafmshba98fffb4faa6fbp11fee2jsn0e57f751651d",
          useQueryString: true,
        },
      };
      const res = await axios.get(
        "https://ali-express1.p.rapidapi.com/search?from=0&query=" + phrase,
        config
      );
      console.log(res);
      dispatch({
        type: SEARCH_RESET,
      });
      dispatch({
        type: SEARCH_SUCCESS,
        payload: res.data,
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
  }
};

export const resetSearch = () => async (dispatch) => {
  dispatch({
    type: SEARCH_FAIL,
  });
};
