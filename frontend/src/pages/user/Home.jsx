import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import bgVideo from "../../assets/bgVideo.mp4";
import {
  AiOutlineMessage,
  AiOutlineCreditCard,
  AiOutlineBell,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <div className="overflow-hidden">
        {/* Landing Section */}
        <div className="relative h-screen w-full">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={bgVideo}
            autoPlay
            loop
            muted
          />
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex flex-col justify-center items-center">
            <h1 className="text-black text-6xl font-bold mb-4 text-center drop-shadow-lg">
              SwiftPass
            </h1>
            <p className="text-black text-lg mb-8 text-center px-4 drop-shadow-lg">
              Get your digital bus pass instantly, connect with fellow
              travelers, and stay updated with real-time notifications.
            </p>
            <Link
              to="/applyPass"
              className="px-6 py-3 bg-blue-500  text-black font-semibold text-lg rounded-lg shadow-md hover:bg-blue-400 transition duration-300"
            >
              Apply for a Pass
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <h2 className="text-4xl font-bold text-center mb-8">Our Features</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {/* Feature 1: Digital Bus Pass */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineCreditCard className="text-6xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Bus Pass</h3>
              <p className="text-gray-600 text-center">
                Apply for and manage your bus pass online with ease.
              </p>
            </div>

            {/* Feature 2: User Chat */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineMessage className="text-6xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">User Chat</h3>
              <p className="text-gray-600 text-center">
                Connect with other passengers to discuss routes and schedules.
              </p>
            </div>

            {/* Feature 3: Email Notifications */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineBell className="text-6xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Real-Time Notifications
              </h3>
              <p className="text-gray-600 text-center">
                Get instant email updates about your pass approval or rejection.
              </p>
            </div>

            {/* Feature 4: Pass Renewal */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineCreditCard className="text-6xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Renewal</h3>
              <p className="text-gray-600 text-center">
                Renew your pass hassle-free before it expires.
              </p>
            </div>

            {/* Feature 5: Payment Integration */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineDollarCircle className="text-6xl text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-center">
                Make payments for your pass easily through our platform.
              </p>
            </div>

            {/* Feature 6: Live Pass Tracking */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:scale-105 hover:opacity-75 cursor-pointer">
              <AiOutlineBell className="text-6xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Pass Status</h3>
              <p className="text-gray-600 text-center">
                Track the status of your bus pass in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-blue-500">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Get Your Bus Pass Now!
            </h2>
            <a
              href="/applyPass"
              className="px-8 py-4 bg-white text-blue-500 font-semibold text-lg rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Apply Now
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
