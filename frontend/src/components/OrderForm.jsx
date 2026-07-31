import React from "react";

function OrderForm({
  formData,
  setFormData,
  handleSubmit,
  editingId,
  restaurants = [],
  menus = [],
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "menu_item_id") {
      const selectedMenu = menus.find(
        (item) => Number(item.id) === Number(value)
      );

      setFormData({
        ...formData,
        menu_item_id: value,
        restaurant_id: selectedMenu ? selectedMenu.restaurant_id : "",
        total_price: selectedMenu ? selectedMenu.price : "",
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">

      <h2 className="text-2xl font-bold mb-5">
        {editingId ? "Update Order" : "Add Order"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        {/* <input
          type="number"
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleChange}
          className="border rounded p-3"
          required
        /> */}

        <select
          name="restaurant_id"
          value={formData.restaurant_id}
          onChange={handleChange}
          className="border rounded p-3"
          required
        >
          <option value="">Select Restaurant</option>

          {restaurants.map((restaurant) => (
            <option
              key={restaurant.id}
              value={restaurant.id}
            >
              {restaurant.name}
            </option>
          ))}
        </select>

        <select
          name="menu_item_id"
          value={formData.menu_item_id}
          onChange={handleChange}
          className="border rounded p-3"
          required
        >
          <option value="">Select Menu Item</option>

          {menus.map((menu) => (
            <option
              key={menu.id}
              value={menu.id}
            >
              {menu.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border rounded p-3"
          required
        />

        <input
          type="number"
          step="0.01"
          name="total_price"
          placeholder="Total Price"
          value={formData.total_price}
          onChange={handleChange}
          className="border rounded p-3"
          required
          readOnly
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded p-3"
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Preparing">Preparing</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button
          type="submit"
          className={`text-white rounded p-3 font-semibold ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Order" : "Add Order"}
        </button>

      </form>

    </div>
  );
}

export default OrderForm;