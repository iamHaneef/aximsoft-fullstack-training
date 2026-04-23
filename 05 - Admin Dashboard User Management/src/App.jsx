import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import UserManagement from "./pages/UserManagement";
import "./App.css";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidebar />
      <UserManagement />
    </div>
  );
}

export default App;