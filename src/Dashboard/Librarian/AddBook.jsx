import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    status: "published",
    description: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e) => {
    setBook({ ...book, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1️⃣ Upload image to imgbb
      let imageUrl = "";
      if (book.imageFile) {
        const formData = new FormData();
        formData.append("image", book.imageFile);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          formData
        );
        imageUrl = res.data.data.url;
      }

      // 2️⃣ Send JSON to backend
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        {
          title: book.title,
          author: book.author,
          price: parseFloat(book.price),
          status: book.status,
          description: book.description,
          image: imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Book added successfully!");
      setBook({ title: "", author: "", price: "", status: "published", description: "", imageFile: null });
    } catch (err) {
      console.error(err);
      alert("Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-primary p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select name="status" value={book.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input type="file" onChange={handleImageChange} />
        {book.imageFile && (
          <img src={URL.createObjectURL(book.imageFile)} alt="Book" className="w-32 h-32 mt-2" />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
