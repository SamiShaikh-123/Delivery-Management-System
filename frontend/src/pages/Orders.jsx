import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import OrderForm from "../components/OrderForm";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menus, setMenus] = useState([]);

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    user_id: 1,
    restaurant_id: "",
    menu_item_id: "",
    quantity: "",
    total_price: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchOrders();
    fetchRestaurants();
    fetchMenus();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const res = await api.get("/restaurants");
      setRestaurants(res.data.restaurants || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMenus = async () => {
    try {
      const res = await api.get("/menu");
      setMenus(res.data.menus || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/orders/${editingId}`, formData);
      } else {
        await api.post("/orders", formData);
      }

      fetchOrders();

      setFormData({
        user_id: 1,
        restaurant_id: "",
        menu_item_id: "",
        quantity: "",
        total_price: "",
        status: "Pending",
      });

      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (order) => {
    setEditingId(order.id);

    setFormData({
      user_id: order.user_id,
      restaurant_id: order.restaurant_id,
      menu_item_id: order.menu_item_id,
      quantity: order.quantity,
      total_price: order.total_price,
      status: order.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.status.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Order Management
        </h1>

        <OrderForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          editingId={editingId}
          restaurants={restaurants}
          menus={menus}
        />

        <input
          type="text"
          placeholder="Search Order Status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-3 mb-6 w-full"
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">

            <thead className="bg-gray-200">
              <tr>
                <th className="border p-3">ID</th>
                <th className="border p-3">User ID</th>
                <th className="border p-3">Restaurant</th>
                <th className="border p-3">Menu Item</th>
                <th className="border p-3">Quantity</th>
                <th className="border p-3">Total Price</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredOrders.map((order) => (

                <tr key={order.id}>

                  <td className="border p-3">{order.id}</td>

                  <td className="border p-3">
                    {order.user_id}
                  </td>

                  <td className="border p-3">
                    {restaurants.find(r => r.id === order.restaurant_id)?.name || order.restaurant_id}
                  </td>

                  <td className="border p-3">
                    {menus.find(m => m.id === order.menu_item_id)?.name || order.menu_item_id}
                  </td>

                  <td className="border p-3">
                    {order.quantity}
                  </td>

                  <td className="border p-3">
                    ₹{order.total_price}
                  </td>

                  <td className="border p-3">
                    {order.status}
                  </td>

                  <td className="border p-3">

                    <button
                      onClick={() => handleEdit(order)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

      </div>
    </Layout>
  );
}

export default Orders;