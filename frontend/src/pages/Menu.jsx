import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MenuForm from "../components/MenuForm";
import api from "../services/api";

function Menu() {
  const [menus, setMenus] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    restaurant_id: "",
    name: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    fetchMenus();
    fetchRestaurants();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await api.get("/menu");
      setMenus(response.data.menus);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await api.get("/restaurants");
      setRestaurants(response.data.restaurants);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("restaurant_id", formData.restaurant_id);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingId) {
        await api.put(`/menu/${editingId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/menu", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchMenus();

      setFormData({
        restaurant_id: "",
        name: "",
        description: "",
        price: "",
        image: null,
      });

      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (menu) => {
    setEditingId(menu.id);

    setFormData({
      restaurant_id: menu.restaurant_id,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;

    try {
      await api.delete(`/menu/${id}`);
      fetchMenus();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Menu Management
        </h1>

        <MenuForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          editingId={editingId}
          restaurants={restaurants}
        />

        <input
          type="text"
          placeholder="Search Menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-3 w-full mb-6"
        />

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-3">Image</th>
                <th className="border p-3">Restaurant</th>
                <th className="border p-3">Item</th>
                <th className="border p-3">Description</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMenus.map((menu) => (
                <tr key={menu.id}>
                  <td className="border p-3">
                    {menu.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${menu.image}`}
                        alt={menu.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="border p-3">
                    {menu.restaurant_name}
                  </td>

                  <td className="border p-3">
                    {menu.name}
                  </td>

                  <td className="border p-3">
                    {menu.description}
                  </td>

                  <td className="border p-3">
                    ₹{menu.price}
                  </td>

                  <td className="border p-3">
                    <button
                      onClick={() => handleEdit(menu)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(menu.id)}
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

export default Menu;