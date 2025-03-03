import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

const AllBuses = () => {
  const [allBuses, setAllBuses] = useState([]);

  const getAllBuses = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/bus/allBuses");
      setAllBuses(data?.buses);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  useEffect(() => {
    getAllBuses();
  }, []);
  return (
    <>
      <Header />
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllBuses;
