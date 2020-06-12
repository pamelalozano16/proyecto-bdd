const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Tablero = require("../../models/Tablero");

const auth = require("../../middleware/auth");

//@route GET api/tablero
//@desc Obtiene tableros
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    //user en profile es el id del user
    const tableros = await Tablero.find({
      user: req.user.id,
    }).populate("user", ["name", "email"]);

    if (tableros.length === 0) {
      return res
        .status(400)
        .json({ msg: "There is no tableros for this user" });
    }

    res.json(tableros);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
//@route GET api/tablero/me/id
//@desc Obtiene tableros
//@access Private
router.get("/me/:id", auth, async (req, res) => {
  try {
    //user en profile es el id del user
    const tableros = await Tablero.findOne({
      _id: req.params.id,
    }).populate("user", ["name", "email"]);

    if (!tableros) {
      return res.status(400).json({ msg: "Not found" });
    }

    res.json(tableros);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//@route POST api/tablero
//@desc Crea tablero
//@access Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Sacas todo del body
    const { name, desc } = req.body;

    //Build tablero object
    const tableroFields = {};

    tableroFields.user = req.user.id;
    if (desc) tableroFields.desc = desc;
    if (name) tableroFields.name = name;

    try {
      //Create
      const tablero = new Tablero(tableroFields);
      await tablero.save();
      res.json(tablero);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    res.send();
  }
);

//@route POST api/tablero/tablero_id
//@desc Update tablero
//@access Private
router.patch("/:tablero_id", auth, async (req, res) => {
  try {
    const tablero = await Tablero.findByIdAndUpdate(
      req.params.tablero_id,
      req.body,
      {
        new: true,
      }
    );
    if (!tablero) {
      return res.status(404).send("Not found");
    }
    await tablero.save();
    res.send(tablero);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

  res.send();
});

//@route PUT api/tablero/img/tablero_id
//@desc Add img
//@access Private
router.put(
  "/img/:tablero_id",
  [auth, [check("imageUrl", "URL is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { imageUrl, comments } = req.body;

    const newPic = {
      imageUrl,
      comments,
    };

    try {
      const tablero = await Tablero.findOne({ _id: req.params.tablero_id });

      //Agrega el nuevoa imagen al array
      if (!tablero) {
        return res.status(400).json({ msg: "Tablero not found" });
      }
      tablero.images.unshift(newPic);
      await tablero.save();
      res.json(tablero);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route PUT api/tablero/proveedor/tablero_id/img_id
//@desc Add proveedor
//@access Private
router.put(
  "/proveedor/:tablero_id/:img_id",
  [
    auth,
    [
      check("imgUrl", "URL is required").not().isEmpty(),
      check("cost", "Cost is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    console.log("si");
    //Sacas todo del body
    const { imgUrl, cost, origin } = req.body;

    //Build proveedor object

    const proveedor = {
      imgUrl,
      cost,
      origin,
    };
    // console.log(newProveedor);
    try {
      const tablero = await Tablero.findOne({ _id: req.params.tablero_id });
      //Agrega el nuevoa imagen al array
      if (!tablero) {
        return res.status(400).json({ msg: "Tablero not found" });
      }
      const addIndex = tablero.images
        .map((item) => item.id)
        .indexOf(req.params.img_id);
      //Borra el experience del array
      const newProveedor = {
        proveedor,
      };

      tablero.images[addIndex].proveedores.unshift(newProveedor);

      await tablero.save();

      res.json(tablero);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/tablero/tablero_id
//@desc Delete tablero
//@access Private

router.delete("/:tablero_id", auth, async (req, res) => {
  try {
    const id = req.params.tablero_id;
    await Tablero.findOneAndRemove({ _id: id });

    res.json({ msg: "Tablero deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//@route DELETE api/img/tablero_id/img_id
//@desc Delete image
//@access Private

router.delete("/img/:tablero_id/:img_id", auth, async (req, res) => {
  try {
    const img = req.params.img_id; //Experience id
    //Buscas el user
    const tablero = await Tablero.findOne({ _id: req.params.tablero_id });
    //Remove index va a ser la posicion donde esta la experiencia
    //Que queremos borrar esto lo que hace es buscar el item.id que sea
    //Igual a exp
    if (!tablero) {
      return res.status(400).json({ msg: "Tablero not found" });
    }
    const removeIndex = tablero.images.map((item) => item.id).indexOf(img);
    //Borra el experience del array
    tablero.images.splice(removeIndex, 1);
    await tablero.save();

    res.json(tablero);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//@route Delete api/tablero/proveedor/tablero_id/img_id/proveedor_id
//@desc Add proveedor
//@access Private
router.delete(
  "/proveedor/:tablero_id/:img_id/:p_id",
  auth,
  async (req, res) => {
    try {
      const img = req.params.img_id; //Experience id
      //Buscas el user
      const tablero = await Tablero.findOne({ _id: req.params.tablero_id });
      //Remove index va a ser la posicion donde esta la experiencia
      //Que queremos borrar esto lo que hace es buscar el item.id que sea
      //Igual a exp
      if (!tablero) {
        return res.status(400).json({ msg: "Tablero not found" });
      }
      const image = tablero.images.map((item) => item.id).indexOf(img);
      if (0 < image) {
        return res.status(400).json({ msg: "Image not found" });
      }

      const deleteIndex = tablero.images[image].proveedores
        .map((item) => item.id)
        .indexOf(req.params.p_id);
      //Borra el experience del array
      tablero.images[image].proveedores.splice(deleteIndex, 1);
      await tablero.save();

      res.json(tablero);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
