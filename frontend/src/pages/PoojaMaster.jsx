import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const PoojaMaster = () => {
  const [poojas, setPoojas] = useState([]);

  const [form, setForm] = useState({
    poojaName: "",
    price: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchPoojas = async () => {
    const res = await API.get("/poojas", {
      headers,
    });

    setPoojas(res.data.poojas);
  };

  useEffect(() => {
    fetchPoojas();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/poojas", form, {
      headers,
    });

    alert("Pooja Added");

    setForm({
      poojaName: "",
      price: "",
      description: "",
    });

    fetchPoojas();
  };

  return (
    <MainLayout>
      <h2>Pooja Master</h2>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >
        <input
          name="poojaName"
          placeholder="Pooja Name"
          value={form.poojaName}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
          Add Pooja
        </button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Pooja</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {poojas.map((p) => (
            <tr key={p._id}>
              <td>{p.poojaName}</td>
              <td>₹{p.price}</td>
              <td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default PoojaMaster;

const styles = {
  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};