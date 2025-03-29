import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [phon_number, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(phon_number, password);
      navigate("/");
    } catch (err) {
      setError(err || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Login
          </h2>
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="block text-white mb-2">Mobile Number</label>

              <input
                type="phon_number"
                value={phon_number}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="block text-white mb-2">Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control ">
              <button
                type="submit"
                className="btn btn-primary mt-6 btn-block rounded-full"
              >
                Login
              </button>
            </div>

            <div className="text-center">
              <Link to="/signup" className="link link-hover text-sm ">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
