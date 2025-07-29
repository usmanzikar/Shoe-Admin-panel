import React, { useEffect, useState } from "react";
import { fetchProducts, updateProductOffer } from "../utils/api";

const OFFER_TABS = ["70%", "50%", "30%"];

const OfferPage = () => {
  const [activeOffer, setActiveOffer] = useState("70%");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, activeOffer]);

  const loadProducts = async () => {
    try {
      const res = await fetchProducts(); // Fetch all products
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const filterProducts = () => {
    setFilteredProducts(products.filter(p => p.offer === activeOffer));
  };

  const handleOfferChange = async (productId, newOffer) => {
    try {
      await updateProductOffer(productId, newOffer); // API call
      setProducts(prev =>
        prev.map(p => (p._id === productId ? { ...p, offer: newOffer } : p))
      );
    } catch (err) {
      console.error("Error updating offer:", err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Manage Offers
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {OFFER_TABS.map(offer => (
          <button
            key={offer}
            onClick={() => setActiveOffer(offer)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeOffer === offer
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
            }`}
          >
            {offer}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-sm text-left bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Current Offer</th>
              <th className="p-3 text-center">Change Offer</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {product.name}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    ${product.price}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {product.stock}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {product.offer}
                  </td>
                  <td className="p-3 text-center">
                    <select
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm cursor-pointer text-gray-800 dark:text-white"
                      value={product.offer || ""}
                      onChange={e =>
                        handleOfferChange(product._id, e.target.value || "")
                      }
                    >
                      <option value="">No Offer</option>
                      {OFFER_TABS.map(o => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  No products found for {activeOffer}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfferPage;
