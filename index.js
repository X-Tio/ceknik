const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/api/ceknik', async (req, res) => {
  const { nik } = req.query;
  if (!nik) return res.status(400).json({ error: 'nik is required' });

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
  }
  `;

  try {
    const response = await axios.post(
      'https://cekdptonline.kpu.go.id/v2',
      { query },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'ms-MY,ms;q=0.9,en-US;q=0.8,en;q=0.7',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json;charset=UTF-8',
          'Origin': 'https://cekdptonline.kpu.go.id',
          'Referer': 'https://cekdptonline.kpu.go.id/',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
          'X-Forwarded-For': '182.1.237.187',
          'Client-IP': '182.1.237.187',
          'X-Real-IP': '182.1.237.187'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Request failed', detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
