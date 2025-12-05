const Barang = require("../models/Barang");

// GET semua barang
exports.getBarang = async (req, res) => {
  try {
    const barang = await Barang.find();
    res.json(barang);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST tambah barang
exports.tambahBarang = async (req, res) => {
  try {
    const { nama, typeHarga, harga, hargaMin, hargaMax, stok } = req.body;

    if (typeHarga === "fixed" && !harga) {
      return res.status(400).json({ message: "Harga tetap wajib diisi." });
    }

    if (typeHarga === "range" && (hargaMin == null || hargaMax == null)) {
      return res.status(400).json({ message: "Harga kisaran wajib diisi (hargaMin & hargaMax)." });
    }

    const barangBaru = new Barang({
      nama,
      typeHarga,
      harga: typeHarga === "fixed" ? harga : null,
      hargaMin: typeHarga === "range" ? hargaMin : null,
      hargaMax: typeHarga === "range" ? hargaMax : null,
      stok
    });

    await barangBaru.save();
    res.json({ message: "Barang berhasil ditambahkan", data: barangBaru });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE barang
exports.updateBarang = async (req, res) => {
  try {
    const { nama, typeHarga, harga, hargaMin, hargaMax, stok } = req.body;

    let updateData = { nama, typeHarga, stok };

    if (typeHarga === "fixed") {
      updateData.harga = harga;
      updateData.hargaMin = null;
      updateData.hargaMax = null;
    } else {
      updateData.harga = null;
      updateData.hargaMin = hargaMin;
      updateData.hargaMax = hargaMax;
    }

    const updated = await Barang.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    res.json({ message: "Barang berhasil diperbarui", data: updated });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// HAPUS barang
exports.hapusBarang = async (req, res) => {
  try {
    const deleted = await Barang.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "ID tidak ditemukan" });
    }
    res.json({ message: "Barang berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

console.log("Barang controller loaded!");

