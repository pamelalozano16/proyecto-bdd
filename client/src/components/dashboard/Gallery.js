import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Gallery = ({ gallery }) =>
  gallery !== null &&
  gallery.length > 0 &&
  gallery.map((pic) => (
    <div key={pic.id} className="gallery">
      <a target="_blank" href={pic.urls.full}>
        <img src={pic.urls.regular} alt={pic.alt_description} />
      </a>
    </div>
  ));

Gallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  gallery: state.search.gallery, //En reducer index
});

export default connect(mapStateToProps)(Gallery);