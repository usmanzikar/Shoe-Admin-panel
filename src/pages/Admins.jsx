import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Pencil, Trash2, UserPlus } from "lucide-react";
import API from "../utils/api";
import { toast } from "react-toastify";


const AdminProfile = () => {
  const { currentUser } = useAuth();

  // Initial admins can be empty, will be fetched from backend
  const [admins, setAdmins] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  // Default role is lowercase 'admin'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [updateData, setUpdateData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const handleAddAdmin = async () => {
    try {
      if (!formData.name || !formData.email || !formData.password || !formData.role) {
        toast.error("All fields are required");
        return;
      }

      const res = await API.post("/admin/create", formData);
      toast.success("Admin added successfully ✅");
       const newAdmin = res.data.admin || res.data.user;

      setAdmins([...admins, newAdmin]);
      setShowAddModal(false);
      setFormData({ name: "", email: "", password: "", role: "admin" });
    } catch (err) {
      console.error("Error adding admin:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to add admin ❌");
    }
  };
const handleUpdateClick = (admin) => {
  setUpdateData({
    id: admin._id || admin.id,
    name: admin.name,
    email: admin.email,
    password: "",  // leave blank always
    role: admin.role.toLowerCase(),
  });
  setShowUpdateModal(true);
};


const handleUpdateAdmin = async () => {
  try {
    const { id, password, ...rest } = updateData;

    // Prepare update payload
    const updatePayload = { ...rest };

    // Only include password if user entered a new one
    if (password && password.trim() !== "") {
      updatePayload.password = password;
    }

    const res = await API.put(`/admin/update/${id}`, updatePayload);
    toast.success("Admin updated successfully 📝");
    const updatedAdmin = res.data.admin;

    const updated = admins.map((a) => ( (a._id || a.id) === id ? updatedAdmin : a));
    setAdmins(updated);
    setShowUpdateModal(false);
  } catch (err) {
    console.error("Error updating admin:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Failed to update admin ❌");
  }
};
//Delete Admin 
const handleDeleteAdmin = async (id) => {
  if (window.confirm("Are you sure you want to delete this admin?")) {
    try {
      await API.delete(`/admin/delete/${id}`);
      toast.success("Admin deleted successfully 🗑️");
      setAdmins(admins.filter((a) => String(a._id || a.id) !== String(id)));
    } catch (err) {
      console.error("Error deleting admin:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to delete admin ❌");
    }
  }
};


  // Fetch all admins from backend on mount
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await API.get("/admin/all");
        setAdmins(res.data.admins);
      } catch (err) {
        console.error("Failed to fetch admins:", err.response?.data || err.message);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="w-full px-4 md:px-10 py-6 bg-orange-50 dark:bg-black min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Panel</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <UserPlus size={16} /> Add Admin
        </button>
      </div>

      {/* Admin Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">Name</th>
              <th className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">Email</th>
              <th className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">Role</th>
              <th className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, idx) => {
              if (!admin) return null; // skip invalid data
              const adminId = admin._id || admin.id;
              return (
                <tr
                  key={adminId || idx}
                  className="hover:bg-orange-50 dark:hover:bg-gray-700"
                >
                  <td className="py-3 px-4">{admin.name}</td>
                  <td className="py-3 px-4">{admin.email}</td>
                  <td className="py-3 px-4 capitalize">{admin.role}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleUpdateClick(admin)}
                      className="text-blue-500 hover:underline"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(adminId)}
                      className="text-red-500 hover:underline"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Admin</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-orange-400 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-orange-400 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 pr-10 border border-orange-400 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-orange-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value.toLowerCase() })
                }
                className="w-full px-3 py-2 border border-orange-400 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleAddAdmin}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Admin Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Update Admin</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={updateData.name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-orange-400 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={updateData.email}
                onChange={(e) =>
                  setUpdateData({ ...updateData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-orange-400 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              <div className="relative">
                <input
                  type={showUpdatePassword ? "text" : "password"}
                  placeholder="Password"
                  value={updateData.password}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 pr-10 border border-orange-400 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowUpdatePassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-orange-500"
                >
                  {showUpdatePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <select
                value={updateData.role}
                onChange={(e) =>
                  setUpdateData({ ...updateData, role: e.target.value.toLowerCase() })
                }
                className="w-full px-3 py-2 border border-orange-400 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleUpdateAdmin}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
