import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts, updateProduct } from "../../utils/api";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [oldImages, setOldImages] = useState([]); 
  const [newImages, setNewImages] = useState([]); 

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchProducts();
        const product = res.data.find((p) => p._id === id);
        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            stock: product.stock,
            shortDesc: product.shortDesc || "",
            detailedDesc: product.detailedDesc || "",
            gender: product.gender || "",
            category: product.category || "",
            offer: product.offer || "",
            categorypage: product.categorypage || "",
            colors: Array.isArray(product.colors) ? product.colors.join(", ") : product.colors || "",
            sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes || "",
          });
          setOldImages(product.images || []);
        }
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveOldImage = (index) => {
    const updatedImages = oldImages.filter((_, i) => i !== index);
    setOldImages(updatedImages);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("oldImages", JSON.stringify(oldImages));

    newImages.forEach((file) => {
      data.append("images", file);
    });

    try {
      await updateProduct(id, data);
      alert("✅ Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update product.");
    }
  };

  if (!formData) return <p className="text-gray-700 dark:text-gray-300">Loading product details...</p>;

  const inputClass =
    "w-full px-4 py-2 border border-orange-400 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-orange-50 dark:bg-black min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Update Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        
        {/* Old Images */}
        {oldImages.length > 0 && (
          <div>
            <p className="font-medium mb-2 text-gray-800 dark:text-gray-300">Existing Images</p>
            <div className="flex flex-wrap gap-4">
              {oldImages.map((img, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={img}
                    alt="Product"
                    className="w-full h-full object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOldImage(index)}
                    className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white text-xs px-1 rounded-full"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Product Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className={inputClass} required />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Price ($)</label>
          <input name="price" type="number" value={formData.price} onChange={handleChange} className={inputClass} required />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Stock Quantity</label>
          <input name="stock" type="number" value={formData.stock} onChange={handleChange} className={inputClass} required />
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Short Description</label>
          <textarea name="shortDesc" value={formData.shortDesc} onChange={handleChange} className={inputClass} />
        </div>

        {/* Detailed Description */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Detailed Description</label>
          <textarea name="detailedDesc" value={formData.detailedDesc} onChange={handleChange} className={inputClass} />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass} required>
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className={inputClass} required>
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

        {/* Category Page */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Category Page</label>
          <select name="categorypage" value={formData.categorypage} onChange={handleChange} className={inputClass} required>
            <option value="">Select Category Page</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
            <option value="Boots">Boots</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Offer */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Offer</label>
          <select name="offer" value={formData.offer} onChange={handleChange} className={inputClass}>
            <option value="">Select Offer</option>
            <option value="70%">70% Off</option>
            <option value="50%">50% Off</option>
            <option value="30%">30% Off</option>
          </select>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Colors (comma separated)</label>
          <input name="colors" value={formData.colors} onChange={handleChange} className={inputClass} placeholder="e.g., Red, Blue" />
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Sizes (comma separated)</label>
          <input name="sizes" value={formData.sizes} onChange={handleChange} className={inputClass} placeholder="e.g., 7, 8, 9" />
        </div>

        {/* New Images */}
        <div>
          <label className="block font-medium mb-1 text-gray-800 dark:text-gray-300">Upload New Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className={inputClass} />
        </div>

        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md transition">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
