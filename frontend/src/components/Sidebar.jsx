import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">
        🚀 Delivery App
      </h2>

      <ul className="space-y-4">

        <li>
          <Link
            to="/dashboard"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/restaurants"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            🏪 Restaurants
          </Link>
        </li>

        <li>
          <Link
            to="/menu"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            🍔 Menu
          </Link>
        </li>

        <li>
          <Link
            to="/orders"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            📦 Orders
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="block w-full text-left hover:bg-red-600 p-2 rounded mt-10"
          >
            🚪 Logout
          </button>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;