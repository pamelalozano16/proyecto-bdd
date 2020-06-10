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
              required: true,
            },
            origin: {
              type: String,
              unique: true,
            },
            cost: {
              type: Number,
              required: true,
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
