import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Products = ({ gallery }) =>
  gallery !== null &&
  gallery.length > 0 &&
  gallery.map((pic) => (
    <div key={pic.productId} className="gallery">
      <a target="_blank" href={pic.productElements.image.imgUrl}>
        <img
          src={pic.productElements.image.imgUrl}
          alt={pic.productElements.title.title}
        />
      </a>
      <div className="desc">
        Price: {pic.productElements.price.sell_price.formatedAmount}
      </div>
    </div>
  ));

Products.propTypes = {
  gallery: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  gallery: state.search.gallery, //En reducer index
});

export default connect(mapStateToProps)(Products);
