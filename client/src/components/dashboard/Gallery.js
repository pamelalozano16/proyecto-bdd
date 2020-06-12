import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddImage from "./AddImage";

const Gallery = ({ gallery }) => {
  const [isAdding, adding] = useState(false);
  const [image, modifyImage] = useState("");
  const addImage = (index) => {
    modifyImage(gallery[index].urls.regular);
    adding(true);
    console.log(gallery[index].urls.regular);
  };

  return (
    <Fragment>
      {gallery !== null &&
        gallery.length > 0 &&
        gallery.map((pic, index) => (
          <div key={pic.id} className="gallery">
            <a target="_blank" href={pic.urls.full}>
              <img src={pic.urls.regular} alt={pic.alt_description} />
            </a>
            <div>
              <button
                className="btn btn-success"
                onClick={() => {
                  addImage(index);
                }}
              >
                Add
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
              <AddImage image={image} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Gallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  gallery: state.search.gallery, //En reducer index
});

export default connect(mapStateToProps)(Gallery);
