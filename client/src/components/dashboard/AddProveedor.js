import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNewImage, addNewProveedor } from "../../actions/search";
import { getOne } from "../../actions/tableros";
const AddProveedor = ({ tableros, image, addNewProveedor }) => {
  const [tableroSel, seleccionado] = useState(false);
  const [data, changeData] = useState({
    tablero_id: "",
    tablero: {},
    image_id: null,
    origin: "https://es.aliexpress.com/item/"+image.productId+".html",
    imageUrl: image.productElements.image.imgUrl,
    cost: image.productElements.price.sell_price.value,
  });
  let imgId = "";
  console.log(image)
  const tableroSelected = (selectedid, index) => {
    console.log("selected: ", selectedid);
    changeData({ ...data, tablero_id: selectedid });
    changeData({ ...data, tablero: tableros[index], tablero_id: selectedid });
    console.log(data)
    seleccionado(true);
  };
  const imageSelected = async (selectedImageid) => {
    console.log("IMAGE SELECTED: ", selectedImageid) 
    changeData({ ...data, image_id: selectedImageid })
    console.log(data)

    addNewProveedor(data, imgId)
    
  }
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
              return(<Fragment key={image._id}>
              <div className="media text-muted pt-3">
                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <div className="d-flex justify-content-between align-items-center w-100">
                  <img src={image.imageUrl} alt={image.imageUrl} />
                    <a>
                        <button className="btn btn-dark"
                          onClick={() => { imgId=image._id; imageSelected(image._id)}}>
                        Agregar
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </Fragment>)
            })}
        </div>
      </div>
    </Fragment>
  );
};
AddProveedor.propTypes = {
  tableros: PropTypes.array.isRequired,
  addNewProveedor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tableros: state.tableros.tableros, //En reducer index
});

export default connect(mapStateToProps, { addNewProveedor })(AddProveedor);
