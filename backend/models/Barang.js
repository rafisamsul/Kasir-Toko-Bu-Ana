const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema({
  nama: { type: String, required: true },

  typeHarga: {
    type: String,
    enum: ["fixed", "range"],
    required: true
  },

  harga: {
    type: Number,
    required: function () {
      return this.typeHarga === "fixed";
    }
  },

  hargaMin: {
    type: Number,
    required: function () {
      return this.typeHarga === "range";
    }
  },

  hargaMax: {
    type: Number,
    required: function () {
      return this.typeHarga === "range";
    }
  },

  stok: { type: Number, required: true }
});

module.exports = mongoose.model("Barang", barangSchema);
