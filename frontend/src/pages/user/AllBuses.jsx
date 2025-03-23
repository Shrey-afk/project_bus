import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import the icon

const AllBuses = () => {
  const [allBuses, setAllBuses] = useState([]);
  const [selectedBusStops, setSelectedBusStops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCheckStops = (stops) => {
    setSelectedBusStops(stops.split(",")); // Split stops by comma
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    getAllBuses();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="w-full mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">All Buses</h2>
        <div className="flex justify-center items-center gap-10 flex-wrap">
          {allBuses.map((bus) => (
            <div
              key={bus._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[400px]"
            >
              <h3 className="text-xl font-semibold mb-2">{bus.name}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">From:</span> {bus.from}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">To:</span> {bus.to}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">First Bus:</span> {bus.firstBus}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Last Bus:</span> {bus.lastBus}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Stops:</span> {bus.routes}
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
                onClick={() => handleCheckStops(bus.routes)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 mt-2"
              >
                Check Stops
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for displaying stops */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-slate-100 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-xl font-semibold mb-4">Bus Stops</h3>
            <div className="space-y-2">
              {selectedBusStops.map((stop, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span className="text-gray-700">{stop.trim()}</span>
                </div>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllBuses;
