import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="avatar">
          <div className="w-14 rounded-full">
            {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
            {/* <Link to="/" className="text-2xl font-bold text-primary"> */}
            <img src="/logo.png" alt="" className="size-6" />
            {/* </Link> */}
          </div>
        </div>

        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <Link to="/home" className="hover:text-secondary text-primary">
                Home
              </Link>
              <Link
                to="/dashboard"
                className="hover:text-secondary text-primary"
              >
                Dashboard
              </Link>
              <Link to="/post" className="hover:text-secondary text-primary">
                Post
              </Link>
              <button
                onClick={handleLogout}
                className="bg-secondary text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-secondary text-primary">
                Login
              </Link>
              <Link to="/signup" className="hover:text-secondary text-primary">
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
