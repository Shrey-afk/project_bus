import React, { useState } from "react";
import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaMapMarker,
  FaImage,
  FaBus,
} from "react-icons/fa";
import { MdEmail, MdDateRange } from "react-icons/md";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

const Apply = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const applied = localStorage.getItem("Applied") || false;
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    fatherOrHusbandName: "",
    age: "",
    mobileNumber: "",
    gender: "",
    address: "",
    studentOrGeneral: "",
    applicantPhoto: "",
    idProofType: "",
    idProofAttachment: "",
    typeOfBusPass: "",
    validityOfPass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "txqi552b"); // Replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/didyxuyd5/image/upload`, // Replace with your cloud name
        formData
      );
      return response.data.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  const handlePayment = async (amount, typeOfBusPass) => {
    const options = {
      key: "rzp_test_ocDqI1oN10flt3", // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in paise (e.g., 50000 paise = ₹500)
      currency: "INR",
      name: "Bus Pass Payment",
      description: `Payment for ${typeOfBusPass} bus pass`,
      image:
        "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Add your logo URL
      handler: function (response) {
        toast.success(
          `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );
        console.log(response);
        navigate("/"); // Navigate to home page after successful payment
      },
      theme: {
        color: "#0d6efd", // Change to match your theme
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      // Upload applicant photo to Cloudinary
      const applicantPhotoUrl = await uploadImageToCloudinary(
        formData.applicantPhoto
      );

      // Upload ID proof attachment to Cloudinary
      const idProofAttachmentUrl = await uploadImageToCloudinary(
        formData.idProofAttachment
      );

      // Prepare data to send to the backend
      const dataToSend = {
        ...formData,
        applicantPhoto: applicantPhotoUrl,
        idProofAttachment: idProofAttachmentUrl,
      };

      // Send data to the backend
      const response = await axios.post(
        "https://project-bus-auxs.onrender.com/tempUser/create",
        dataToSend
      );
      if (!response.data?.success) {
        setLoader(false);
        setFormData("");
        return toast.error("You have already applied for bus pass!");
      }
      localStorage.setItem("Applied", true);
      console.log("Form submitted successfully:", response.data);

      // Determine payment amount based on type of bus pass
      let paymentAmount = 0;
      switch (formData.typeOfBusPass) {
        case "Monthly":
          paymentAmount = 200;
          break;
        case "Quarterly":
          paymentAmount = 500;
          break;
        case "Yearly":
          paymentAmount = 1000;
          break;
        default:
          paymentAmount = 0;
      }

      // Trigger Razorpay payment
      if (paymentAmount > 0) {
        handlePayment(paymentAmount, formData.typeOfBusPass);
        setLoader(false);
      } else {
        alert("Invalid bus pass type selected.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <>
      <Header />
      {applied ? (
        <h1 className="font-bold text-[40px] text-center mt-[200px]">
          You have already applied for your pass!!
        </h1>
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Apply for Bus Pass
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4">
                <MdEmail className="text-gray-600 text-2xl" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Full Name */}
              <div className="flex items-center space-x-4">
                <FaUser className="text-gray-600 text-2xl" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Father/Husband Name */}
              <div className="flex items-center space-x-4">
                <FaUser className="text-gray-600 text-2xl" />
                <input
                  type="text"
                  name="fatherOrHusbandName"
                  placeholder="Father/Husband Name"
                  value={formData.fatherOrHusbandName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Age */}
              <div className="flex items-center space-x-4">
                <FaUser className="text-gray-600 text-2xl" />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="flex items-center space-x-4">
                <FaPhone className="text-gray-600 text-2xl" />
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Gender */}
              <div className="flex items-center space-x-4">
                <FaUser className="text-gray-600 text-2xl" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-4">
                <FaMapMarker className="text-gray-600 text-2xl" />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Student or General */}
              <div className="flex items-center space-x-4">
                <FaUser className="text-gray-600 text-2xl" />
                <select
                  name="studentOrGeneral"
                  value={formData.studentOrGeneral}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Student">Student</option>
                  <option value="General">General</option>
                </select>
              </div>

              {/* Applicant Photo */}
              <div className="flex items-center space-x-4">
                <FaImage className="text-gray-600 text-2xl" />
                <input
                  type="file"
                  name="applicantPhoto"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* ID Proof Type */}
              <div className="flex items-center space-x-4">
                <FaIdCard className="text-gray-600 text-2xl" />
                <select
                  name="idProofType"
                  value={formData.idProofType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select ID Proof Type
                  </option>
                  <option value="Aadhar">Aadhar</option>
                  <option value="PAN">PAN</option>
                  <option value="Driving License">Driving License</option>
                </select>
              </div>

              {/* ID Proof Attachment */}
              <div className="flex items-center space-x-4">
                <FaIdCard className="text-gray-600 text-2xl" />
                <input
                  type="file"
                  name="idProofAttachment"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Type of Bus Pass */}
              <div className="flex items-center space-x-4">
                <FaBus className="text-gray-600 text-2xl" />
                <select
                  name="typeOfBusPass"
                  value={formData.typeOfBusPass}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select Type of Bus Pass
                  </option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              {/* Validity of Pass */}
              <div className="flex items-center space-x-4">
                <MdDateRange className="text-gray-600 text-2xl" />
                <input
                  type="number"
                  name="validityOfPass"
                  placeholder="Validity of Pass (in months)"
                  value={formData.validityOfPass}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {loader ? (
                    <ImSpinner8 className="animate-spin " />
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      )}
    </>
  );
};

export default Apply;
