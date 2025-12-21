import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

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

    Swal.fire({
      title: "Adding book...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    try {
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

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken(true);
      localStorage.setItem("token", token);

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

      Swal.fire({
        icon: "success",
        title: "Book added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setBook({
        title: "",
        author: "",
        price: "",
        status: "published",
        description: "",
        imageFile: null,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to add book",
        text: err.response?.data?.message || err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 text-secondary">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
          Add New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={book.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={book.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
          />

          <select
            name="status"
            value={book.status}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-black border-2 border-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg resize-none"
            rows={4}
          />

          <div>
            <label className="block mb-2 font-medium text-white">
              Book Cover Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-purple-900 hover:file:bg-yellow-500"
            />
          </div>

          {book.imageFile && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(book.imageFile)}
                alt="Book Preview"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg object-cover mt-3 shadow-lg"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 rounded-xl shadow-lg transition duration-300"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
