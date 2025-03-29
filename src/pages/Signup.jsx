import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phon_number: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const { name, phon_number, password } = formData;

      await signup(name, phon_number, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Create Account
          </h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Full Name</label>
              <input
                type="text"
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input input-bordered"
              />
            </div>

            <div>
              <label className="block text-white mb-2">phon_number</label>
              <input
                type="phon_number"
                required
                onChange={(e) =>
                  setFormData({ ...formData, phon_number: e.target.value })
                }
                className="input input-bordered"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                required
                minLength="6"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="input input-bordered"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                required
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="input input-bordered"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-6 btn-block rounded-full"
            >
              {/* w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 */}
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
