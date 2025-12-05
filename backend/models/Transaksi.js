const mongoose = require("mongoose");

const transaksiSchema = new mongoose.Schema({
  tanggal: { type: Date, default: Date.now },
  items: [
    {
      barang: { type: mongoose.Schema.Types.ObjectId, ref: "Barang", required: true },
      qty: { type: Number, required: true },
      harga: { type: Number, required: true },
      subtotal: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Transaksi", transaksiSchema);
