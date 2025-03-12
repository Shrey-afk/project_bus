import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure you have axios installed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook to navigate after successful login
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      // role === "admin" &&
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      navigate("/createBus");
      return;
    }
    console.log(email, password);
    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      // Handle login error
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-end bg-[url('https://img.freepik.com/free-photo/crop-female-hand-using-validator-payment-while-boarding-public-transport-close-up-hand_7502-10606.jpg?t=st=1739288671~exp=1739292271~hmac=d91f11b0078ae01b27e8e7984fcad1e982c8dc58822a6969e2ff66cb87b79aed&w=1060')] bg-cover">
      <div className="w-full h-full backdrop-blur-sm flex items-center justify-end">
        <div className="bg-opacity-65 bg-white shadow-lg rounded-lg p-8 max-w-md w-full mr-10 font-serif">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            LOGIN
          </h2>
          <form onSubmit={handleSubmit}>
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

            {/* Display error message if login fails */}
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-purple-500 text-center hover:bg-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Sign In
              </button>
            </div>

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
      </div>
    </div>
  );
};

export default Login;
