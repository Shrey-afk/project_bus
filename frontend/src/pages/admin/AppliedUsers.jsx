import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import QRCode from "qrcode";
import { ImSpinner8 } from "react-icons/im";
import { ImCross } from "react-icons/im";

const AppliedUsers = () => {
  const [appliedUsers, setAllAppliedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delloading, setDelLoading] = useState(false);

  // Fetch all applied users
  const getAllAppliedUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/tempUser/getAlltempUser"
      );
      setAllAppliedUsers(data.allTempUsers);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTempUser = async (id, approved) => {
    if (!approved) {
      setDelLoading(true);
    }

    try {
      await axios.post("http://localhost:5000/tempUser/delete", {
        id,
      });
      approved ? null : alert("User Rejected for bus pass!!");
      setDelLoading(false);
      if (!approved) {
        getAllAppliedUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateQRCode = async (data) => {
    try {
      return await QRCode.toDataURL(data);
    } catch (error) {
      console.error("QR Code generation error:", error);
      return null;
    }
  };

  const uploadToCloudinary = async (base64Image) => {
    try {
      const formData = new FormData();
      formData.append("file", base64Image);
      formData.append("upload_preset", "txqi552b"); // Replace with Cloudinary upload preset

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/didyxuyd5/image/upload", // Replace with your Cloudinary URL
        formData
      );

      return response.data.secure_url; // Cloudinary returns the image URL
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  // Handle Approve Function
  const handleApprove = async (user) => {
    try {
      setLoading(true);
      const randomPassword = Math.random().toString(36).slice(-8);

      const qrData = JSON.stringify({
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        typeOfBusPass: user.typeOfBusPass,
        validityOfPass: user.validityOfPass,
        password: randomPassword,
      });

      // Generate QR Code
      const qrBase64 = await generateQRCode(qrData);
      if (!qrBase64) {
        alert("QR Code generation failed.");
        return;
      }

      // Upload to Cloudinary
      const qrUrl = await uploadToCloudinary(qrBase64);
      if (!qrUrl) {
        alert("QR Code upload failed.");
        return;
      }

      // Send data to the backend
      const { data } = await axios.post("http://localhost:5000/user/register", {
        ...user,
        password: randomPassword,
        busPass: qrUrl, // Store Cloudinary QR code URL
        approved: true,
      });
      const newUser = data?.newUser;
      await axios.post("http://localhost:5000/send-busPass", {
        user: newUser,
      });

      await deleteTempUser(user?._id, true);
      setLoading(false);
      alert("User approved successfully!");

      getAllAppliedUser();
    } catch (error) {
      console.error("Error approving user:", error);
      alert("Failed to approve user. Please try again.");
    }
  };

  useEffect(() => {
    getAllAppliedUser();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Applied Users
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <img
                  src={user.applicantPhoto}
                  alt="Applicant"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800">
                  {user.fullName}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Father/Husband Name:</span>{" "}
                  {user.fatherOrHusbandName}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Age:</span> {user.age}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Mobile:</span>{" "}
                  {user.mobileNumber}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Gender:</span> {user.gender}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Address:</span> {user.address}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Category:</span>{" "}
                  {user.studentOrGeneral}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">ID Proof:</span>{" "}
                  {user.idProofType}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Bus Pass Type:</span>{" "}
                  {user.typeOfBusPass}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Validity:</span>{" "}
                  {user.validityOfPass} months
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Approved:</span>{" "}
                  {user.approved}
                </p>
              </div>

              {/* Approve Button */}
              <div className="mt-6 flex justify-center gap-10">
                <button
                  onClick={() => handleApprove(user)}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  {loading ? (
                    <ImSpinner8
                      size={30}
                      className="animate-spin text-center"
                    />
                  ) : (
                    <>
                      <FaCheck className="mr-2" /> Approve
                    </>
                  )}
                </button>
                <button
                  onClick={() => deleteTempUser(user?._id, false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                >
                  {delloading ? (
                    <ImSpinner8
                      size={30}
                      className="animate-spin text-center"
                    />
                  ) : (
                    <>
                      <ImCross className="mr-2" />
                      Reject
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppliedUsers;
