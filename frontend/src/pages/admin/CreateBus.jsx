import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader";
import { FaTrash, FaEdit, FaBus } from "react-icons/fa";

const CreateBus = () => {
  const [allBuses, setAllBuses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [busData, setBusData] = useState({
    name: "",
    from: "",
    to: "",
    date: "",
    departureTime: "",
    // conductor: "",
  });
  const [editBusData, setEditBusData] = useState({
    _id: "",
    name: "",
    from: "",
    to: "",
    date: "",
    departureTime: "",
    // conductor: "",
  });

  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditBusData({ ...editBusData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/bus/create",
        busData
      );
      console.log("Bus Created:", response.data);
      setIsOpen(false);
      setBusData({
        name: "",
        from: "",
        to: "",
        date: "",
        departureTime: "",
        // conductor: "",
      });
      getAllBuses(); // Refresh the list of buses
    } catch (error) {
      console.error("Error creating bus:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/bus/update", {
        id: editBusData._id,
        ...editBusData,
      });
      console.log("Bus Updated:", response.data);
      setIsEditModalOpen(false);
      getAllBuses(); // Refresh the list of buses
    } catch (error) {
      console.error("Error updating bus:", error);
    }
  };

  const getAllBuses = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/bus/allBuses");
      setAllBuses(data?.buses);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost:5000/bus/delete/`, { id });
      getAllBuses(); // Refresh the list of buses
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  const handleEditClick = (bus) => {
    setEditBusData({
      _id: bus._id,
      name: bus.name,
      from: bus.from,
      to: bus.to,
      date: bus.date,
      departureTime: bus.departureTime,
      conductor: bus.conductor,
    });
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    getAllBuses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Bus</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add New Bus
        </button>
      </div>

      {/* Create Bus Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Enter Bus Details</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={busData.name}
                onChange={handleChange}
                placeholder="Bus Name"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="from"
                value={busData.from}
                onChange={handleChange}
                placeholder="From"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="to"
                value={busData.to}
                onChange={handleChange}
                placeholder="To"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="date"
                name="date"
                value={busData.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="time"
                name="departureTime"
                value={busData.departureTime}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="conductor"
                value={busData.conductor}
                onChange={handleChange}
                placeholder="Conductor ID"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-400 px-4 py-2 rounded-lg text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 px-4 py-2 rounded-lg text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Bus Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Bus Details</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="name"
                value={editBusData.name}
                onChange={handleEditChange}
                placeholder="Bus Name"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="from"
                value={editBusData.from}
                onChange={handleEditChange}
                placeholder="From"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="to"
                value={editBusData.to}
                onChange={handleEditChange}
                placeholder="To"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="date"
                name="date"
                value={editBusData.date}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="time"
                name="departureTime"
                value={editBusData.departureTime}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                name="conductor"
                value={editBusData.conductor}
                onChange={handleEditChange}
                placeholder="Conductor ID"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-400 px-4 py-2 rounded-lg text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 px-4 py-2 rounded-lg text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Buses in Card Format */}
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">All Buses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBuses.map((bus) => (
            <div
              key={bus._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <FaBus className="text-4xl text-blue-600" />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(bus._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleEditClick(bus)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit className="text-xl" />
                  </button>
                </div>
              </div>
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
    </div>
  );
};

export default CreateBus;
