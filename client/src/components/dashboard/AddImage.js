import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNewImage } from "../../actions/search";
const AddImage = ({ tableros, image, addNewImage }) => {
  const imageSelected = (id) => {
    console.log(id);
    addNewImage(image, id);
  };
  return (
    <Fragment>
      <div className="addImage">
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">
            Selecciona el tablero que deseas utilizar
          </h6>
          {tableros !== null &&
            tableros.length > 0 &&
            tableros.map((tablero) => {
              return (
                <Fragment key={tablero._id}>
                  <div className="media text-muted pt-3">
                    <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <strong className="text-gray-dark">
                          {tablero.name}
                        </strong>
                        <a>
                          <button
                            className="btn btn-dark"
                            onClick={() => imageSelected(tablero._id)}
                          >
                            Agregar
                          </button>
                        </a>
                      </div>
                      <span className="d-block">{tablero.desc}</span>
                    </div>
                  </div>
                </Fragment>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};
AddImage.propTypes = {
  tableros: PropTypes.array.isRequired,
  addNewImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tableros: state.tableros.tableros, //En reducer index
});

export default connect(mapStateToProps, { addNewImage })(AddImage);
