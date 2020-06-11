const mongoose = require("mongoose");

const TableroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  images: [
    {
      imageUrl: {
        type: String,
      },
      proveedores: [
        {
          proveedor: {
            imgUrl: {
              type: String,
            },
            origin: {
              type: String,
              default: "",
            },
            cost: {
              type: Number,
            },
          },
        },
      ],
      comments: {
        type: String,
      },
    },
  ],
  desc: {
    type: String,
    default: "",
  },
});

module.exports = Tablero = mongoose.model("tablero", TableroSchema);
