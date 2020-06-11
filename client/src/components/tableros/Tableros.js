import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTableros, resetTableros } from "../../actions/tableros";
import Boards from "./Boards";

const Tableros = ({ isAuthenticated, loading, getTableros, tableros }) => {
  useEffect(() => {
    const runEffect = async () => {
      await getTableros();
    };
    runEffect();
  }, []);

  return (
    <Fragment>
      <div className="form-group">
        <button type="button" className="btn btn-primary">
          Crear Tablero
        </button>
      </div>
      <section>
        {tableros !== null &&
          tableros.length > 0 &&
          tableros.map((tablero) => {
            return (
              <div className="card bg-light mb-3" key={tablero._id}>
                <div className="card-header"></div>
                <div className="card-body">
                  <h5 className="card-title">{tablero.name}</h5>
                  <p className="card-text">{tablero.desc}</p>
                </div>
              </div>
            );
          })}
      </section>
    </Fragment>
  );
};

Tableros.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  getTableros: PropTypes.func.isRequired,
  tableros: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.isAuthenticated,
  tableros: state.tableros.tableros,
});

export default connect(mapStateToProps, { getTableros })(Tableros);
