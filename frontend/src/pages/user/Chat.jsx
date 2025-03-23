// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// // Connect to the backend
// const socket = io("http://localhost:5000");

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [activeUsers, setActiveUsers] = useState([]); // Store active users

//   // Retrieve user details from local storage
//   const user = JSON.parse(localStorage.getItem("user"));
//   const username = user.fullName;

//   useEffect(() => {
//     // Send the username to the backend when the component mounts
//     socket.emit("addUser", username);

//     // Fetch chat history
//     socket.on("chatHistory", (history) => {
//       setChatMessages(history);
//     });

//     // Listen for new messages from the server
//     socket.on("receiveMessage", (newMessage) => {
//       setChatMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Listen for the active users list from the server
//     socket.on("activeUsers", (users) => {
//       setActiveUsers(users); // Update the active users list
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off("chatHistory");
//       socket.off("receiveMessage");
//       socket.off("activeUsers");
//     };
//   }, [username]);

//   const sendMessage = () => {
//     if (message.trim() !== "") {
//       const newMessage = { content: message, username };
//       socket.emit("sendMessage", newMessage); // Send message to the server
//       setMessage(""); // Clear the input field
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col h-screen">
//         <div className="flex flex-1 bg-gray-100">
//           {/* Active Users Section */}
//           <div className="w-1/4 bg-white border-r border-gray-300 p-4 overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Active Users</h2>
//             <ul className="space-y-2">
//               {activeUsers.map((user, index) => (
//                 <li
//                   key={index}
//                   className="p-2 rounded-lg bg-violet-200 font-bold"
//                 >
//                   {user}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex flex-col w-3/4 h-[650px] p-4 bg-gray-50">
//             <div className="flex-1 overflow-y-auto mb-4 p-4 border rounded-lg bg-white">
//               <div className="space-y-4">
//                 {chatMessages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${
//                       msg.username === username
//                         ? "justify-end" // Your message (right aligned)
//                         : "justify-start" // Others' message (left aligned)
//                     }`}
//                   >
//                     <div
//                       className={`p-3 rounded-lg max-w-xs ${
//                         msg.username === username
//                           ? "bg-blue-500 text-white" // Blue for your messages
//                           : "bg-green-500 text-white" // Green for others' messages
//                       }`}
//                     >
//                       <strong>{msg.username}:</strong> {msg.content}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 className="flex-1 px-4 py-6 border rounded-l-lg focus:outline-none"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               />
//               <button
//                 className="bg-blue-500 text-white px-6 py-2 rounded-r-lg"
//                 onClick={sendMessage}
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Chat;
