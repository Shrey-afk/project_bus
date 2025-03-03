import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/user/Home";
import Apply from "./pages/user/Apply";
import Payment from "./pages/user/Payment";
import AppliedUsers from "./pages/admin/AppliedUsers";
import CreateBus from "./pages/admin/CreateBus";
import AllBuses from "./pages/user/AllBuses";
import Complaint from "./pages/user/Complaint";
import Complaints from "./pages/admin/Complaints";
import Profile from "./pages/user/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/allBuses" element={<AllBuses />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/appliedUsers" element={<AppliedUsers />} />
          <Route path="/createBus" element={<CreateBus />} />
          <Route path="/all-complaints" element={<Complaints />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
