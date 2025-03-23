import React, { useEffect, useState } from "react";
import ConductorHeader from "../../components/ConductorHeader";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaQrcode } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QrReader } from "react-qr-reader"; // For QR scanning

const SingleConductorBus = () => {
  const id = localStorage.getItem("busId");
  const [bus, setBus] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for bus pass display
  const [showScanner, setShowScanner] = useState(false); // State to toggle QR scanner visibility

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
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch bus details.");
    }
  };

  const handleScan = async (result) => {
    if (result) {
      try {
        const userData = JSON.parse(result); // Parse the scanned QR data
        setSelectedUser(userData); // Set the selected user to display the bus pass
        setShowScanner(false); // Hide the scanner after successful scan
      } catch (error) {
        toast.error("Invalid QR code. Please try again.");
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
    toast.error("Failed to scan QR code.");
  };

  const handleMarkAsVerified = async (userID) => {
    try {
      await axios.post("http://localhost:5000/user/addBus", {
        busID: id,
        userID,
      });
      toast.success("User marked as verified!");
      setSelectedUser(null); // Close the bus pass card
      getBus(); // Refresh the bus data
    } catch (error) {
      toast.error("Failed to mark user as verified.");
    }
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

          {/* Verify QR Button */}
          <div className="text-center">
            <button
              onClick={() => setShowScanner(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mx-auto"
            >
              <FaQrcode className="mr-2" />
              Verify QR
            </button>
          </div>

          {/* QR Scanner */}
          {showScanner && (
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                />
                <button
                  onClick={() => setShowScanner(false)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Close Scanner
                </button>
              </div>
            </div>
          )}

          {/* Bus Pass Display Section */}
          {selectedUser && (
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
              <div className="w-[400px] bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-2 right-2 text-white hover:text-gray-200"
                >
                  <FaTimesCircle className="text-2xl" />
                </button>

                {/* Bus Pass Content */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedUser.fullName}
                    </h2>
                    <p className="text-sm">{selectedUser.studentOrGeneral}</p>
                  </div>
                  <img
                    src={selectedUser.applicantPhoto}
                    alt="Applicant Photo"
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-blue-100">Father/Husband Name</p>
                    <p className="font-semibold">
                      {selectedUser.fatherOrHusbandName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Age</p>
                    <p className="font-semibold">{selectedUser.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Gender</p>
                    <p className="font-semibold">{selectedUser.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Mobile Number</p>
                    <p className="font-semibold">{selectedUser.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Validity</p>
                    <p className="font-semibold">
                      {selectedUser.validityOfPass} month(s)
                    </p>
                  </div>
                </div>
                {/* QR Image Below Profile Picture */}
                <div className="mt-4 text-center">
                  <img
                    src={selectedUser.busPass}
                    alt="Bus Pass QR"
                    className="w-24 h-24 mx-auto object-contain"
                  />
                </div>

                {/* Tick Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => handleMarkAsVerified(selectedUser._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
                  >
                    <FaCheckCircle className="mr-2" />
                    Mark as Verified
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleConductorBus;
