import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import {
  FaUser,
  FaBus,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const History = () => {
  const userData = JSON.parse(localStorage.getItem("user")); // Get logged-in user data
  const id = userData?._id; // Extract user ID

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/getSingle",
        {
          id,
        }
      );
      console.log(data);
      setUser(data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Travel History
          </h1>

          {/* User Details Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaUser className="mr-2 text-blue-600" />
              User Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600">Full Name</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user.fullName}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Mobile Number</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user.mobileNumber}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Address</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user.address}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Gender</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user.gender}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Type of Bus Pass</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user.typeOfBusPass}
                </p>
              </div>
            </div>
          </div>

          {/* Travel History Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaBus className="mr-2 text-blue-600" />
              Travel History
            </h2>
            {user.travelHistory.length > 0 ? (
              <table className="min-w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Bus Name</th>
                    <th className="px-6 py-4 text-left">From</th>
                    <th className="px-6 py-4 text-left">To</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Departure Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {user.travelHistory.map((bus) => (
                    <tr
                      key={bus._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {bus.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
                        {bus.from}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
                        {bus.to}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <FaCalendarAlt className="inline mr-2 text-blue-600" />
                        {new Date(bus.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <FaClock className="inline mr-2 text-blue-600" />
                        {bus.departureTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-600 py-6">
                No travel history found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
