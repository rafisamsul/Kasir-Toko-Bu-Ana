const Transaksi = require("../models/Transaksi");
const Barang = require("../models/Barang");

exports.createTransaksi = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items transaksi tidak boleh kosong" });
    }

    let total = 0;
    let processedItems = [];

    for (const item of items) {
      const barang = await Barang.findById(item.barang);
      if (!barang) {
        return res.status(404).json({ message: `Barang dengan ID ${item.barang} tidak ditemukan` });
      }

      // hitung subtotal
      const subtotal = item.qty * item.harga;
      total += subtotal;

      // kurangi stok
      if (barang.stok < item.qty) {
        return res.status(400).json({
          message: `Stok barang "${barang.nama}" tidak cukup. Stok sekarang: ${barang.stok}`
        });
      }

      barang.stok -= item.qty;
      await barang.save();

      // push ke list item yang sudah diproses
      processedItems.push({
        barang: item.barang,
        qty: item.qty,
        harga: item.harga,
        subtotal
      });
    }

    // simpan transaksi
    const transaksiBaru = await Transaksi.create({
      items: processedItems,
      total
    });

    res.json({
      message: "Transaksi berhasil!",
      transaksi: transaksiBaru
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
