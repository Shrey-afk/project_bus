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
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for bus pass modal

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
    const user = bus.users.find((user) => user._id === userId);
    setSelectedUser(user);
    toast.success(`Scanned user with ID ${userId}. User is verified.`);
  };

  const handleMarkAsVerified = async (userID) => {
    await axios.post("http://localhost:5000/user/addBus", {
      busID: id,
      userID,
    });
    toast.success(`Success`);
  };

  const handleDeleteUser = (userId) => {
    toast.success(`User with ID: ${userId} deleted.`);
  };

  useEffect(() => {
    getBus();
  }, []);

  if (!bus) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const BusPassModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="w-80 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">{user.fullName}</h2>
              <p className="text-sm">{user.studentOrGeneral}</p>
            </div>
            <img
              src={user.applicantPhoto}
              alt="Applicant Photo"
              className="w-16 h-16 rounded-full border-2 border-white"
            />
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-blue-100">Father/Husband Name</p>
              <p className="font-semibold">{user.fatherOrHusbandName}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Age</p>
              <p className="font-semibold">{user.age}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Gender</p>
              <p className="font-semibold">{user.gender}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Mobile Number</p>
              <p className="font-semibold">{user.mobileNumber}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Validity</p>
              <p className="font-semibold">{user.validityOfPass} month(s)</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <img
              src={qrCodeUrls[user._id]}
              alt="Bus Pass QR"
              className="w-24 h-24 mx-auto object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

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
            <div className="overflow-x-auto">
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
                          src={qrCodeUrls[user._id]}
                          alt={`QR Code for ${user.fullName}`}
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="px-6 py-4 flex items-center space-x-4">
                        <button
                          onClick={() => handleMarkAsVerified(user._id)}
                          className="text-green-600 hover:text-green-700 transition-colors mt-5"
                        >
                          <FaCheckCircle className="text-2xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Bus Pass Modal */}
      {selectedUser && (
        <BusPassModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};

export default SingleConductorBus;
