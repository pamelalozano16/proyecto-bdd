import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddProveedor from "./AddProveedor";

const Products = ({ gallery }) => {
  const [isAdding, adding] = useState(false);
  const [image, modifyImage] = useState("");
  const addImage = (index) => {
    modifyImage(gallery[index]);
    adding(true);
  };

  return (
    <Fragment>
      {gallery !== null &&
        gallery.length > 0 &&
        gallery.map((pic, index) => (
          <div key={pic.productId} className="gallery">
            <a target="_blank" href={pic.productElements.image.imgUrl}>
              <img
                src={pic.productElements.image.imgUrl}
                alt={pic.productElements.title.title}
              />
            </a>
            <div className="desc">
              Price: {pic.productElements.price.sell_price.formatedAmount}
              <div> <a href={"https://es.aliexpress.com/item/"+pic.productId+".html"} >Go to product</a></div>
             
              <button
                className="btn btn-success"
                onClick={() => {
                  addImage(index);
                }}
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      {isAdding && (
        <Fragment>
          <div className="modalBox">
            <div className="formModalBox tableBox">
              <i
                className="fa fa-window-close"
                onClick={() => adding(false)}
              ></i>
              <AddProveedor image={image} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Products.propTypes = {
  gallery: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  gallery: state.search.gallery, //En reducer index
});

export default connect(mapStateToProps)(Products);
