import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageProducts() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const API_URL = `${baseUrl}/product`;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  // console.log("user", user.token);

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  console.log("form", form);

  // console.log(products);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(API_URL);
      // console.log(res);

      setProducts(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });
    setEditingId(null);
  };

  const handleEdit = (prodect) => {
    setForm({
      name: prodect.name,
      description: prodect.description,
      price: prodect.price,
      category: prodect.category,
      image: null,
    });
    setEditingId(prodect._id);
  };
  const handleDelete = async (prodect) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`${API_URL}/${prodect._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProduct();
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Failed to delete product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", form.image);

    setLoading(true);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast("Product updated");
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast("Product added");
      }

      fetchProduct();
      resetForm();
    } catch (error) {
      console.error("Error saving product", error);

      console.log("Backend response:", error.response?.data);
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="container py-4">
      <h2 className="mb-4"> Manage Products</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Add Product</h5>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Product Name"
                className="form-control mb-2"
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                className="form-control mb-2"
                onChange={handleChange}
                value={form.description}
              ></textarea>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control mb-2"
                onChange={handleChange}
                value={form.price}
                required
              />
              <input
                type="text"
                name="category"
                value={form.category}
                placeholder="Catagory"
                className="form-control mb-2"
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="image"
                // value={form.image}
                className="form-control mb-3"
                accept="image/*"
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary w-100">
                {loading
                  ? "saving"
                  : editingId
                  ? "update product"
                  : "Add Product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className=" btn btn-secondary w-100 mt-2"
                  onClick={resetForm}
                >
                  cancel edit
                </button>
              )}
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Product list</h5>
            <table className="table table-hover align-middle ">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th style={{ width: "13px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prodect) => (
                  <tr key={prodect._id}>
                    <td>
                      <img
                        src={prodect.image}
                        alt={prodect.name}
                        style={{ width: "50px", borderRadius: "5px" }}
                      />
                    </td>
                    <td>{prodect.name}</td>
                    <td>₹{prodect.price}</td>
                    <td>{prodect.category}</td>
                    <td>
                      <button
                        className="btn btn-sm  me-1 m-0"
                        onClick={() => handleEdit(prodect)}
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm  me-2"
                        onClick={() => handleDelete(prodect)}
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
