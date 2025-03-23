import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaSpinner } from "react-icons/fa"; // Icons from React Icons
import Header from "../../components/Header";

const Complaint = () => {
  const [complaint, setComplaint] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      setMessage("User ID not found. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://project-bus-auxs.onrender.com/complain/add",
        {
          userId,
          complaint,
        }
      );

      if (response.status === 201) {
        setMessage("Complaint submitted successfully!");
        setComplaint("");
      } else {
        setMessage("Failed to submit complaint. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Submit a Complaint
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Describe your complaint here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="5"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaPaperPlane className="mr-2" />
                )}
                {isSubmitting ? "Submitting..." : "Send Complaint"}
              </button>
            </div>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Complaint;
