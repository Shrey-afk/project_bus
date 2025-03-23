import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";
import { FaSpinner, FaBus, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Conductors = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAssignBusModal, setShowAssignBusModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [conductors, setAllConductors] = useState([]);
  const [buses, setAllBuses] = useState([]);
  const [selectedConductorId, setSelectedConductorId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusId, setSelectedBusId] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAssignBusClose = () => {
    setShowAssignBusModal(false);
    setSelectedConductorId(null);
    setSearchQuery("");
    setSelectedBusId(null);
  };

  const handleAssignBusShow = (conductorId) => {
    setSelectedConductorId(conductorId);
    setShowAssignBusModal(true);
  };

  const generateRandomPassword = () => {
    const length = 10;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const getAllConductors = async () => {
    try {
      const { data } = await axios.get(
        "https://project-bus-auxs.onrender.com/conductor/allConductors"
      );
      setAllConductors(data?.conductors);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBuses = async () => {
    try {
      const { data } = await axios.get(
        "https://project-bus-auxs.onrender.com/bus/allBuses"
      );
      setAllBuses(data?.buses);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const password = generateRandomPassword();
      const registerResponse = await axios.post(
        "https://project-bus-auxs.onrender.com/conductor/register",
        {
          name,
          email,
          password,
        }
      );
      console.log("Registration successful:", registerResponse.data);

      const sendConductorResponse = await axios.post(
        "https://project-bus-auxs.onrender.com/send-conductor",
        {
          name,
          email,
          password,
        }
      );
      console.log("Conductor added successfully:", sendConductorResponse.data);

      handleClose();
      toast.success("Conductor added successfully!");
      getAllConductors();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add conductor.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignBus = async () => {
    if (!selectedBusId || !selectedConductorId) {
      toast.error("Please select a bus.");
      return;
    }

    try {
      const response = await axios.post(
        "https://project-bus-auxs.onrender.com/conductor/add-bus",
        {
          conductorId: selectedConductorId,
          busId: selectedBusId,
        }
      );
      console.log("Bus assigned successfully:", response.data);
      toast.success("Bus assigned successfully!");
      handleAssignBusClose();
      getAllConductors();
    } catch (error) {
      console.error("Error assigning bus:", error);
      toast.error("Failed to assign bus.");
    }
  };

  useEffect(() => {
    getAllConductors();
    getAllBuses();
  }, []);

  const filteredBuses = buses.filter((bus) =>
    bus.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminHeader />
      <ToastContainer />
      <button
        onClick={handleShow}
        className="bg-blue-500 text-white mt-10 ml-10 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Conductor
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {conductors.map((conductor) => (
          <div
            key={conductor._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <FaUser className="text-2xl text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold">{conductor.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{conductor.email}</p>
            {conductor.bus ? (
              <div className="mb-4">
                <h4 className="text-lg font-semibold">Assigned Bus:</h4>
                <div className="bg-gray-100 p-3 rounded-md mt-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span>{" "}
                    {conductor.bus.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">From:</span>{" "}
                    {conductor.bus.from}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">To:</span>{" "}
                    {conductor.bus.to}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(conductor.bus.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Departure Time:</span>{" "}
                    {conductor.bus.departureTime}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-red-500 mb-4">No bus assigned</p>
            )}
            <button
              onClick={() => handleAssignBusShow(conductor._id)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
            >
              <FaBus className="mr-2" />
              {conductor.bus ? "Change Bus" : "Assign Bus"}
            </button>
          </div>
        ))}
      </div>

      {/* Add Conductor Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Conductor</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Bus Modal */}
      {showAssignBusModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3">
            <h2 className="text-xl font-semibold mb-4">Assign Bus</h2>
            <input
              type="text"
              placeholder="Search buses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">From</th>
                    <th className="px-4 py-2 border">To</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Departure Time</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBuses.map((bus) => (
                    <tr
                      key={bus._id}
                      className={`hover:bg-gray-50 ${
                        selectedBusId === bus._id ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="px-4 py-2 border">{bus.name}</td>
                      <td className="px-4 py-2 border">{bus.from}</td>
                      <td className="px-4 py-2 border">{bus.to}</td>
                      <td className="px-4 py-2 border">
                        {new Date(bus.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border">{bus.departureTime}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => setSelectedBusId(bus._id)}
                          className={`px-4 py-2 text-sm font-medium ${
                            selectedBusId === bus._id
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          } rounded-md`}
                        >
                          {selectedBusId === bus._id ? "Selected" : "Select"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleAssignBusClose}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssignBus}
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Assign Bus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Conductors;
