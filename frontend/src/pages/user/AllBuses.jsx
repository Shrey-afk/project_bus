import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllBuses = () => {
  const [allBuses, setAllBuses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user data
  const userID = user?._id; // Extract user ID

  const getAllBuses = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/bus/allBuses");
      setAllBuses(data?.buses);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const handleBookBus = async (busID) => {
    try {
      const { data } = await axios.post("http://localhost:5000/bus/addUser", {
        userID,
        busID,
      });
      if (data) {
        toast.success("Bus booked successfully!");
      } else {
        toast.error("Failed to book the bus.");
      }
    } catch (error) {
      console.error("Error booking bus:", error);
      toast.error("An error occurred while booking the bus.");
    }
  };

  useEffect(() => {
    getAllBuses();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">All Buses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBuses.map((bus) => (
            <div
              key={bus._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[300px]"
            >
              <h3 className="text-xl font-semibold mb-2">{bus.name}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">From:</span> {bus.from}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">To:</span> {bus.to}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Date:</span>{" "}
                {new Date(bus.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Departure Time:</span>{" "}
                {bus.departureTime}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Created At:</span>{" "}
                {new Date(bus.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleBookBus(bus._id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
              >
                Book Bus
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllBuses;
