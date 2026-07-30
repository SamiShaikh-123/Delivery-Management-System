import React from "react";

function MenuForm({
  formData,
  setFormData,
  handleSubmit,
  editingId,
  restaurants,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-5">
        {editingId ? "Update Menu Item" : "Add Menu Item"}
      </h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <select
          name="restaurant_id"
          value={formData.restaurant_id}
          onChange={handleChange}
          className="border rounded p-3"
          required
        >
          <option value="">Select Restaurant</option>

          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="border rounded p-3 md:col-span-2"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          className="border rounded p-3"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.files[0],
            })
          }
          className="border rounded p-3"
        />

        <button
          type="submit"
          className={`text-white rounded p-3 font-semibold ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Menu" : "Add Menu"}
        </button>
      </form>
    </div>
  );
}

export default MenuForm;