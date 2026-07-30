import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    restaurants: 0,
    menus: 0,
    orders: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const restaurants = await api.get("/restaurants");
      const menus = await api.get("/menu");
      const orders = await api.get("/orders");

      setStats({
        restaurants: restaurants.data.restaurants.length,
        menus: menus.data.menus.length,
        orders: orders.data.orders.length,
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold">
              Restaurants
            </h2>

            <p className="text-5xl mt-4 font-bold">
              {stats.restaurants}
            </p>
          </div>

          <div className="bg-green-500 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold">
              Menu Items
            </h2>

            <p className="text-5xl mt-4 font-bold">
              {stats.menus}
            </p>
          </div>

          <div className="bg-orange-500 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold">
              Orders
            </h2>

            <p className="text-5xl mt-4 font-bold">
              {stats.orders}
            </p>
          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;