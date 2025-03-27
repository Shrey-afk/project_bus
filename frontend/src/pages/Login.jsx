import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure you have axios installed
import { ImSpinner8 } from "react-icons/im";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook to navigate after successful login
  const [role, setRole] = useState("user"); // Default role is "user"
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin login logic
    if (
      role === "admin" &&
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      navigate("/createBus");
      return;
    }

    setLoading(true);

    // User login logic
    if (role === "user") {
      try {
        // Send login request to backend
        const response = await axios.post(
          "https://project-bus-auxs.onrender.com/user/login",
          {
            email,
            password,
          }
        );
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } catch (error) {
        // Handle login error
        toast.error(error.response?.data?.message);
        setLoading(false);
        setErrorMessage(error.response?.data?.message || "Login failed");
      }
    } else {
      setErrorMessage("Invalid role or credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-end bg-[url('https://img.freepik.com/free-photo/crop-female-hand-using-validator-payment-while-boarding-public-transport-close-up-hand_7502-10606.jpg?t=st=1739288671~exp=1739292271~hmac=d91f11b0078ae01b27e8e7984fcad1e982c8dc58822a6969e2ff66cb87b79aed&w=1060')] bg-cover">
      <div className="w-full h-full backdrop-blur-sm flex items-center lg:justify-end justify-center p-4">
        <div className="bg-opacity-65 bg-white shadow-lg rounded-lg p-8 max-w-md w-full lg:mr-10 font-serif place-self-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            LOGIN
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Role Selection */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Select your role
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Display error message if login fails */}
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-purple-500 text-center hover:bg-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                {loading ? (
                  <ImSpinner8 className="animate-spin place-self-center" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Conductor Login Link */}
            <p className="text-center text-gray-600 text-[16px] mt-4">
              Login as conductor?{" "}
              <Link
                to="/conductorLogin"
                className="text-purple-500 hover:text-purple-700 font-bold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Login;
