import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../utils/api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    shortDesc: "",
    detailedDesc: "",
    gender: "",
    category: "",
    offer: "",
    categorypage: "",
    colors: "",
    sizes: "",
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (key === "colors" || key === "sizes") {
        formData.append(
          key,
          value.split(",").map((v) => v.trim())
        ); // No JSON.stringify
      } else {
        formData.append(key, value);
      }
    });

    imageFiles.forEach((file) => formData.append("images", file));

    try {
      await createProduct(formData);
      alert("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error(
        "Add product error:",
        error.response?.data || error.message
      );
      alert("Failed to add product");
    }
  };

  const inputClasses =
    "w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white transition";
  const labelClasses = "block font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white dark:bg-gray-800 p-6 rounded shadow"
      >
        <div>
          <label className={labelClasses}>Product Name</label>
          <input
            name="name"
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Price</label>
          <input
            name="price"
            type="number"
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Stock</label>
          <input
            name="stock"
            type="number"
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Short Description</label>
          <textarea
            name="shortDesc"
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Detailed Description</label>
          <textarea
            name="detailedDesc"
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            className={inputClasses}
            required
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Category</label>
          <select
            name="category"
            onChange={handleChange}
            className={inputClasses}
            required
          >
            <option value="">Select Category</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Formal">Formal</option>
            <option value="Loafers">Loafers</option>
            <option value="Boots">Boots</option>
            <option value="Heels">Heels</option>
            <option value="Flats">Flats</option>
            <option value="Running">Running</option>
            <option value="Football">Football</option>
            <option value="Training">Training</option>
            <option value="Basketball">Basketball</option>
            <option value="Slippers">Slippers</option>
            <option value="Daily Wear">Daily Wear</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Category Page</label>
          <select
            name="categorypage"
            onChange={handleChange}
            className={inputClasses}
            required
          >
            <option value="">Select Category Page</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
            <option value="Boots">Boots</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Offer</label>
          <select name="offer" onChange={handleChange} className={inputClasses}>
            <option value="">Select Offer</option>
            <option value="70%">70% Off</option>
            <option value="50%">50% Off</option>
            <option value="30%">30% Off</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Colors (comma separated)</label>
          <input
            name="colors"
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Sizes (comma separated)</label>
          <input
            name="sizes"
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className={inputClasses}
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded transition w-full"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
