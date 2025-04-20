import React, { useEffect, useState } from "react";

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    doors: "",
    ac: "",
    transmission: "",
    fuel: "",
    img: "",
    price: "",
    available: true,
  });

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`/api/vehicles/${selectedVehicle.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehicles((prev) => prev.filter((v) => v.id !== selectedVehicle.id));
      closeModals();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    setIsSaving(true);
    try {
      await fetch(`/api/vehicles/${selectedVehicle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      await fetchVehicles();
      closeModals();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const openEditModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      doors: vehicle.doors,
      ac: vehicle.ac,
      transmission: vehicle.transmission,
      fuel: vehicle.fuel,
      img: vehicle.img,
      price: vehicle.price,
      available: vehicle.available,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      {loading ? (
        <p className="text-center">Loading vehicles...</p>
      ) : vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm"
            >
              <div>
                <p className="font-semibold">
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </p>
                <p className="text-sm text-gray-600">ID: {vehicle.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => openEditModal(vehicle)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => openDeleteModal(vehicle)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Vehicle</h3>

            <label className="block mb-1 font-semibold">Make</label>
            <input
              type="text"
              value={formData.make}
              onChange={(e) =>
                setFormData({ ...formData, make: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <label className="block mb-1 font-semibold">Model</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <label className="block mb-1 font-semibold">Year</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <label className="block mb-1 font-semibold">Doors</label>
            <input
              type="text"
              value={formData.doors}
              onChange={(e) =>
                setFormData({ ...formData, doors: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <label className="block mb-1 font-semibold">AC</label>
            <select
              value={formData.ac}
              onChange={(e) => setFormData({ ...formData, ac: e.target.value })}
              className="w-full mb-2 px-3 py-2 border rounded"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label className="block mb-1 font-semibold">Transmission</label>
            <select
              value={formData.transmission}
              onChange={(e) =>
                setFormData({ ...formData, transmission: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>

            <label className="block mb-1 font-semibold">Fuel</label>
            <select
              value={formData.fuel}
              onChange={(e) =>
                setFormData({ ...formData, fuel: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Electric">Electric</option>
            </select>

            <label className="block mb-1 font-semibold">Image URL</label>
            <input
              type="text"
              value={formData.img}
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <label className="block mb-1 font-semibold">Price / Day</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 border rounded"
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) =>
                  setFormData({ ...formData, available: e.target.checked })
                }
                className="mr-2"
              />
              <label>Available</label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-red-600">
              Confirm Deletion
            </h3>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>
                {selectedVehicle.make} {selectedVehicle.model}
              </strong>
              ?<br />
              <span className="text-red-600 font-semibold">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
