import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNewImage } from "../../actions/search";
import { getOne } from "../../actions/tableros";
const AddImage = ({ tableros, image, addNewImage }) => {
  const [tableroSel, seleccionado] = useState(false);
  const [data, changeData] = useState({
    tablero_id: "",
    tablero: {},
    image_id: "",
    origin: "",
    imageUrl: "",
    cost: 0,
  });
  const tableroSelected = (id, index) => {
    console.log("selected: ", id);
    //  console.log(id);
    // console.log(index);
    changeData({ tablero_id: id });
    // console.log(tableros);
    // console.log(tableros[index]);
    changeData({ tablero: tableros[index] });
    seleccionado(true);
  };
  return (
    <Fragment>
      <div className="addImage">
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">
            Selecciona el tablero que deseas utilizar
          </h6>
          {tableroSel === false &&
            tableros !== null &&
            tableros.length > 0 &&
            tableros.map((tablero, index) => {
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
                            onClick={() => tableroSelected(tablero._id, index)}
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
          {/* profile.experience.map((item) => item.id).indexOf(exp); */}
          {tableroSel &&
            data.tablero.images.map((image) => {
              console.log(image);
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
