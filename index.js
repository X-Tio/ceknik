const axios = require('axios');

module.exports = async function handler(req, res) {
  const { nik } = req.query;

  if (!nik) {
    return res.status(400).json({ error: 'nik is required' });
  }

  const query = `
  {
    findNikSidalih(
      nik: "${nik}",
      wilayah_id: 0,
      token: "${Date.now()}"
    ) {
      nama
      nik
      nkk
      provinsi
      kabupaten
      kecamatan
      kelurahan
      tps
      alamat
      lat
      lon
      metode
      lhp {
        nama
        nik
        nkk
        kecamatan
        kelurahan
        tps
        id
        flag
        source
        alamat
        lat
        lon
        metode
      }
    }
  }`;

  try {
    const response = await axios.post(
      'https://cekdptonline.kpu.go.id/v2',
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://cekdptonline.kpu.go.id',
          'Referer': 'https://cekdptonline.kpu.go.id/',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', message: err.message });
  }
};
