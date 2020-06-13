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
  const [open, toggleOpen]=useState({
    isOpen:false,
    open_id:""
  });
let {isOpen, open_id} = open;
  
const openTablero = (id)=>{
    if(isOpen){
      toggleOpen({...open, isOpen:!isOpen, open_id:""});
    } else{
    toggleOpen({...open, isOpen:!isOpen, open_id:id});
  }
  }
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
      <section className="tableros">
        {tableros !== null &&
          tableros.length > 0 &&
          tableros.map((tablero) => {
            return (
              <div
                  className="card bg-light mb-3"
                  key={tablero._id}
              >
                <div
                    className="card-body"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                      <button
                          className="btn btn-success"
                          onClick={() =>{openTablero(tablero._id)}}
                      >
                        {" "}
            {isOpen&&open_id===tablero._id?"Cerrar":"Abrir"}{" "}
                      </button>
                    </div>
                  </div>
                  {isOpen&&open_id===tablero._id&&(<Fragment>
                    {console.log(open_id)}
                    <div className="imagenesTablero">
                  <ul className="list-group list-group-horizontal">
                    {tablero?.images?.map(image => (
                        <li className="list-group-item" style={{ marginBottom: 5 }}>
                          <img
                              src={image.imageUrl}
                              className="card-img-top"
                              alt={image.imageUrl}
                              style={{ width: 100, height: 100, marginRight: 10 }}
                          />
                          <ul className="list-group">
                            {image.proveedores.length === 0 &&
                              <div className="list-group-item" style={{ marginBottom: 5 }}>
                                <span className="badge badge-pill badge-secondary p-2 m-1">
                                  No tiene proveedores
                                </span>
                              </div>}
                            {console.log(image.proveedores)}
                            {image.proveedores.length !== 0 &&
                            image.proveedores.map(({ proveedor: provider}, i) =>
                              <div>
                                <a
                                    href={provider.origin}
                                    target="_blank"
                                >
                                     <span className="badge badge-pill badge-secondary p-2 m-1">
                                       {`Ver proveedor ${i + 1}`}
                                     </span>
                                </a>
                                <span className="badge badge-pill badge-primary p-2 m-1">
                                      {`Precio: $${provider.cost}`}
                                  </span>
                              </div>
                            )}
                          </ul>
                        </li>
                    ))}
                  </ul>
                  </div>
                  </Fragment>)}
                  
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