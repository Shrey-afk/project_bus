import React, { useEffect, useState } from "react";
import ConductorHeader from "../../components/ConductorHeader";
import axios from "axios";
import { FaCheckCircle, FaTrash, FaQrcode } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import QRCode from "qrcode"; // For generating QR code image URLs

const SingleConductorBus = () => {
  const id = localStorage.getItem("busId");
  const [bus, setBus] = useState(null);
  const [qrCodeUrls, setQrCodeUrls] = useState({}); // Store QR code image URLs

  const getBus = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/bus/getSingleBus",
        {
          id,
        }
      );
      console.log(data);
      setBus(data);

      // Generate QR code image URLs for all users
      const urls = {};
      for (const user of data.users) {
        const url = await QRCode.toDataURL(user._id);
        urls[user._id] = url;
      }
      setQrCodeUrls(urls);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch bus details.");
    }
  };

  const handleScanQR = (userId) => {
    // Simulate QR code scanning

    toast.success(`Scanned user with ID ${userId} user is verified`);
  };

  const handleMarkAsVerified = async (userID) => {
    // Simulate marking user as verified
    await axios.post("http://localhost:5000/user/addBus", {
      busID: id,
      userID,
    });
    toast.success(`Success`);
  };

  const handleDeleteUser = (userId) => {
    // Simulate deleting user
    toast.success(`User with ID: ${userId} deleted.`);
  };

  useEffect(() => {
    getBus();
  }, []);

  if (!bus) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      <ConductorHeader />
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Bus: {bus.name} ({bus.from} to {bus.to})
          </h1>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Photo</th>
                  <th className="px-6 py-4 text-left">Full Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Mobile</th>
                  <th className="px-6 py-4 text-left">Pass Type</th>
                  <th className="px-6 py-4 text-left">QR Code</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bus.users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={user.applicantPhoto}
                        alt={user.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.mobileNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.typeOfBusPass}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={qrCodeUrls[user._id]} // Display QR code as an image
                        alt={`QR Code for ${user.fullName}`}
                        className="w-16 h-16"
                      />
                    </td>
                    <td className="px-6 py-4 flex items-center space-x-4">
                      <button
                        onClick={() => handleScanQR(user._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                      >
                        <FaQrcode className="mr-2" />
                        Scan
                      </button>
                      <button
                        onClick={() => handleMarkAsVerified(user._id)}
                        className="text-green-600 hover:text-green-700 transition-colors"
                      >
                        <FaCheckCircle className="text-2xl" />
                      </button>
                      {/* <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <FaTrash className="text-2xl" />
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleConductorBus;
