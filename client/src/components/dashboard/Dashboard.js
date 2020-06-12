import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { search, resetSearch } from "../../actions/search";
import { connect } from "react-redux";
import Gallery from "./Gallery";
import Products from "./Products";
import { loadUser } from "../../actions/auth";
import { getTableros } from "../../actions/tableros";

const Dashboard = ({
  isAuthenticated,
  search,
  getTableros,
  resetSearch,
  loadUser,
}) => {
  const [formData, setFormData] = useState({
    type: "",
    phrase: "",
  });
  useEffect(() => {
    getTableros();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const { type, phrase } = formData;
  const onChange = (e) => {
    loadUser();
    if (e.target.type === "radio") {
      resetSearch();
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    search({ type, phrase });
  };
  return (
    <Fragment>
      <section>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="search"
              name="phrase"
              placeholder="Search.."
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="radio"
              id="img"
              name="type"
              value="img"
              onChange={(e) => onChange(e)}
            />
            <label htmlFor="img">Imagenes</label>
            <input
              type="radio"
              id="provedoores"
              name="type"
              value="provedoores"
              onChange={(e) => onChange(e)}
            />
            <label htmlFor="provedoores">Proveedores</label>
          </div>
          <div className="form-group">
            <button type="button" type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        {/* <Gallery /> */}
        <Fragment>{type == "img" ? <Gallery /> : <Products />}</Fragment>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  search: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  getTableros: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  search,
  loadUser,
  resetSearch,
  getTableros,
})(Dashboard);
