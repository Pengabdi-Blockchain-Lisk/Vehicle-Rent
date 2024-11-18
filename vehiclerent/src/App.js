import React, { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [mobil, setMobil] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [pax, setPax] = useState("");
  const [harga, setHarga] = useState("");
  const [data, setData] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (image && mobil && lokasi && pax && harga) {
      const newEntry = { mobil, lokasi, pax, harga };
      setData([...data, newEntry]);
      setImage(null);
      setMobil("");
      setLokasi("");
      setPax("");
      setHarga("");
      document.getElementById("imageInput").value = "";
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  return (
    <div className="app-container">
      <form onSubmit={handleAdd} className="form-container" class="input-group mb-3 padding-bottom-4">
        <input class="form-control" type="text" placeholder="Mobil" value={mobil} onChange={(e) => setMobil(e.target.value)} required />
        <input class="form-control" type="text" placeholder="Lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)} required />
        <input class="form-control" type="number" placeholder="Pax" value={pax} onChange={(e) => setPax(e.target.value)} required />
        <input class="form-control" type="number" placeholder="Harga" value={harga} onChange={(e) => setHarga(e.target.value)} required />
        <input type="file" accept="image/*" id="imageInput" onChange={handleImageUpload} required />
        <button type="submit" class="btn btn-primary">
          Add
        </button>
      </form>

      <table class="table">
        <thead class="table-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Mobil</th>
            <th scope="col">Lokasi</th>
            <th scope="col">Pax</th>
            <th scope="col">Harga</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.image && <img src={item.image} alt="Uploaded" className="table-image" />}</td>
              <td>{item.mobil}</td>
              <td>{item.lokasi}</td>
              <td>{item.pax}</td>
              <td>{item.harga}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
