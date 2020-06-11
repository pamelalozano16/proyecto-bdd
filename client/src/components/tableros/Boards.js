import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Boards = ({ tableros }) =>
  tableros !== null &&
  tableros.length > 0 &&
  tableros.map((tablero) => (
    <div class="card bg-light mb-3" style="max-width: 18rem;" key={tablero._id}>
      <div class="card-header"></div>
      <div class="card-body">
        <h5 class="card-title">{tablero.name}</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  ));

Boards.propTypes = {
  tableros: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tableros: state.tableros.tableros,
});

export default connect(mapStateToProps, {})(Boards);
