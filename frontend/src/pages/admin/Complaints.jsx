import React, { useState, useEffect } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";

const Complaints = () => {
  const [allComplaints, setAllComplaints] = useState([]);

  const getAllComplaints = async () => {
    try {
      const { data } = await axios.get(
        "https://project-bus-auxs.onrender.com/complain/all"
      );
      setAllComplaints(data?.complaints); // Store the complaints in state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComplaints();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          All Complaints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allComplaints?.length > 0 ? (
            allComplaints?.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={complaint?.user?.applicantPhoto}
                    alt={complaint?.user?.fullName}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {complaint?.user?.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {complaint?.user?.email}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{complaint?.complaint}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">
              No complaints found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Complaints;
