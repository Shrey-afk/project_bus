import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaKey } from "react-icons/fa"; // Icons from React Icons
import Header from "../../components/Header";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const userId = userInfo?._id;
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Fetch user data
  const getUser = async () => {
    try {
      const { data } = await axios.post(
        "https://project-bus-auxs.onrender.com/user/getSingle",
        {
          id: userId,
        }
      );
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        "https://project-bus-auxs.onrender.com/user/updatePassword",
        {
          id: userId,
          oldPassword,
          newPassword,
        }
      );
      alert(response.data.message);
      setNewPassword("");
      setOldPassword("");
      setIsModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change password.");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          {/* Top Section: Flex Layout for Bus Pass, Change Password, and Additional Details */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            {/* Bus Pass Card */}
            <div className="w-full lg:w-80 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
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
                  <p className="font-semibold">
                    {user.validityOfPass} month(s)
                  </p>
                </div>
              </div>
              {/* QR Image Below Profile Picture */}
              <div className="mt-4 text-center">
                <img
                  src={user.busPass}
                  alt="Bus Pass QR"
                  className="w-24 h-24 mx-auto object-contain"
                />
              </div>
            </div>

            {/* Additional User Details Section */}
            <div className="w-full bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                User Details
              </h2>
              {/* Grid Layout for User Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID Proof Type</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.idProofType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type of Bus Pass</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.typeOfBusPass}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.mobileNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Validity of Pass</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.validityOfPass} month(s)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Father/Husband Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.fatherOrHusbandName}
                  </p>
                </div>
              </div>
              {/* Change Password Button at Bottom-Right */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  <FaKey className="mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Change Password
            </h2>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
