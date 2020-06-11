import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import { connect } from "react-redux";
import {
  getTableros,
  resetTableros,
  deleteTablero,
  getOne,
} from "../../actions/tableros";
import Boards from "./Boards";
import CreateTablero from "./CreateTablero";

const Tableros = ({
  newCreated,
  getTableros,
  tableros,
  deleteTablero,
  getOne,
}) => {
  useEffect(() => {
    const runEffect = async () => {
      await getTableros();
    };
    runEffect();
  }, []);
  const [data, changeData] = useState({
    isNew: true,
    _id: false,
  });
  const { isNew, _id } = data;
  const [displayCreate, toggleCreate] = useState(newCreated);
  const onDelete = (id) => {
    let _id = id;
    deleteTablero(_id);
  };
  const onEdit = (id) => {
    changeData({ isNew: false, _id: id });
    getOne(id);
    toggleCreate(true);
  };

  return (
    <Fragment>
      <div className="form-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            changeData({ isNew: true, _id: "" });
            toggleCreate(!displayCreate);
          }}
        >
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
                  <div className="form">
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(tablero._id)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={() => onEdit(tablero._id)}
                    >
                      {" "}
                      Edit{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
      {displayCreate && (
        <Fragment>
          <div className="modalBox">
            <div className="formModalBox">
              <i
                class="fa fa-window-close"
                onClick={() => toggleCreate(false)}
              ></i>
              <CreateTablero data={data} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Tableros.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  newCreated: PropTypes.bool,
  getTableros: PropTypes.func.isRequired,
  getOne: PropTypes.func.isRequired,
  deleteTablero: PropTypes.func.isRequired,
  tableros: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.isAuthenticated,
  tableros: state.tableros.tableros,
  newCreated: state.tableros.newCreated,
});

export default connect(mapStateToProps, { getTableros, deleteTablero, getOne })(
  Tableros
);
