import { useEffect, useState } from "react";

function RestaurantForm({
  formData,
  setFormData,
  handleSubmit,
  editingId,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-5 text-gray-700">
        {editingId ? "Update Restaurant" : "Add Restaurant"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Restaurant Address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className={`text-white rounded-lg p-3 font-semibold transition ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Restaurant" : "Add Restaurant"}
        </button>
      </form>
    </div>
  );
}

export default RestaurantForm;