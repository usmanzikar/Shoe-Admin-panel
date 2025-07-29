import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../../utils/api";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Products
        </h2>
        <Link
          to="/products/addproduct"
          className="bg-orange-500 text-white px-5 py-2 rounded shadow hover:bg-orange-600 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Table Wrapper (scrollable on mobile) */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-sm text-left bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`border-b dark:border-gray-600 ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-gray-800"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="p-3 text-gray-800 dark:text-gray-200">{product.name}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">${product.price}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{product.stock}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <Link
                      to={`/products/updateproduct/${product._id}`}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
