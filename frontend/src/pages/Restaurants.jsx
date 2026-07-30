import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import RestaurantForm from "../components/RestaurantForm";
import api from "../services/api";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await api.get("/restaurants");
      setRestaurants(response.data.restaurants || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/restaurants/${editingId}`, formData);
        alert("Restaurant Updated Successfully");
      } else {
        await api.post("/restaurants", formData);
        alert("Restaurant Added Successfully");
      }

      setFormData({
        name: "",
        address: "",
        phone: "",
      });

      setEditingId(null);
      fetchRestaurants();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (restaurant) => {
    setEditingId(restaurant.id);

    setFormData({
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/restaurants/${id}`);
      alert("Restaurant Deleted Successfully");
      fetchRestaurants();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Restaurant Management
      </h1>

      <RestaurantForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      <input
        type="text"
        placeholder="Search Restaurant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-3 w-full mb-6"
      />

      <div className="bg-white shadow rounded-lg p-5 overflow-x-auto">

        <table className="w-full border">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Edit</th>
              <th className="p-3 border">Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="border p-3 text-center">
                    {restaurant.id}
                  </td>

                  <td className="border p-3">
                    {restaurant.name}
                  </td>

                  <td className="border p-3">
                    {restaurant.address}
                  </td>

                  <td className="border p-3">
                    {restaurant.phone}
                  </td>

                  <td className="border p-3 text-center">
                    <button
                      onClick={() => handleEdit(restaurant)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  </td>

                  <td className="border p-3 text-center">
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No Restaurants Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Restaurants;