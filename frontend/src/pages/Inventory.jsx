import {
  useState,
  useEffect,
} from "react";

import API from "../services/api";

import MainLayout from "../layouts/MainLayout";

const Inventory = () => {
  const [items, setItems] =
    useState([]);

  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    unit: "",
    minStock: "",
    price: "",
  });

  const token = localStorage.getItem(
    "token"
  );

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchItems = async () => {
    const res = await API.get(
      "/inventory",
      { headers }
    );

    setItems(res.data.items || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post(
      "/inventory",
      form,
      { headers }
    );

    alert("Item Added");

    setForm({
      itemName: "",
      quantity: "",
      unit: "",
      minStock: "",
      price: "",
    });

    fetchItems();
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2>📦 Inventory Management</h2>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            name="itemName"
            placeholder="Item Name"
            value={form.itemName}
            onChange={handleChange}
          />

          <input
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
          />

          <input
            name="unit"
            placeholder="Unit"
            value={form.unit}
            onChange={handleChange}
          />

          <input
            name="minStock"
            placeholder="Min Stock"
            value={form.minStock}
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <button type="submit">
            Add Item
          </button>
        </form>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((i) => (
              <tr key={i._id}>
                <td>{i.itemName}</td>
                <td>{i.quantity}</td>
                <td>{i.unit}</td>
                <td>₹{i.price}</td>

                <td>
                  {i.quantity <=
                  i.minStock ? (
                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      Low Stock
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "green",
                      }}
                    >
                      Available
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Inventory;

const styles = {
  page: {
    padding: "20px",
  },

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