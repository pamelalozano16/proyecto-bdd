import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postTableros, getOne, updateTablero } from "../../actions/tableros";
import Axios from "axios";

const Boards = ({ updateTablero, postTableros, data, getOne, tablero }) => {
  console.log(data);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    id: "",
  });

  const x = tablero;
  useEffect(() => {
    setFormData({
      name: data.isNew ? "" : x.name,
      desc: data.isNew ? "" : x.desc,
      id: data.isNew ? "" : x._id,
    });
  }, [tablero]);

  const { name, desc, id } = formData;

  const onChange = (e) => {
    console.log(formData.id);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.isNew) {
      postTableros({ name, desc });
    } else {
      console.log(formData.id);
      updateTablero({ name, desc, id });
    }
  };

  return (
    <Fragment>
      <h1 className="text-primary">Create Tablero</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Board's name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            placeholder="Description"
            name="desc"
            minLength="6"
            value={desc}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>

        <input type="submit" className="btn btn-dark" value="Save" />
      </form>
    </Fragment>
  );
};

Boards.propTypes = {
  postTableros: PropTypes.func.isRequired,
  updateTablero: PropTypes.func.isRequired,
  tablero: PropTypes.any,
};

const mapStateToProps = (state) => ({
  tablero: state.tableros.tablero,
});

export default connect(mapStateToProps, {
  postTableros,
  getOne,
  updateTablero,
})(Boards);
