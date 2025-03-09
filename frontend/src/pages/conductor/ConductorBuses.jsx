import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConductorHeader from "../../components/ConductorHeader";
import axios from "axios";
import {
  FaBus,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const ConductorBuses = () => {
  const [conductor, setConductor] = useState(null);
  const navigate = useNavigate();
  const conductorData = JSON.parse(localStorage.getItem("conductor"));
  const id = conductorData?._id;

  const getConductor = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/conductor/singleConductor",
        {
          id,
        }
      );
      console.log(data);
      setConductor(data?.conductor);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConductor();
  }, []);

  const handleCheckBus = (busId) => {
    localStorage.setItem("busId", busId); // Save bus ID to localStorage
    navigate("/singleConductorBus"); // Navigate to /singleBus
  };

  if (!conductor) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      <ConductorHeader />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Your Bus Details
          </h1>
          {conductor.bus ? (
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaBus className="text-4xl text-blue-600 mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {conductor.bus.name}
                    </h2>
                    <p className="text-gray-600">Bus Service</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCheckBus(conductor.bus._id)}
                  className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  <span>Check</span>
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-xl text-blue-600 mr-4" />
                  <div>
                    <p className="text-gray-600">From</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {conductor.bus.from}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-xl text-blue-600 mr-4" />
                  <div>
                    <p className="text-gray-600">To</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {conductor.bus.to}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-xl text-blue-600 mr-4" />
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(conductor.bus.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-xl text-blue-600 mr-4" />
                  <div>
                    <p className="text-gray-600">Departure Time</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {conductor.bus.departureTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600">
              No bus assigned yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConductorBuses;
