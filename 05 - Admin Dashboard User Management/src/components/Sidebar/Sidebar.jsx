import React from "react";
import meter from "./meter.png"
import "./Sidebar.css"

const Sidebar = () => {
    return (
        <div className="sidecontainer">
            <div className="head">
                <img src={meter}></img>
                <h2>Admin Dashboard</h2>
            </div>
            <div className="elements">
                <p>Dashboard Home</p>
                <p>User Management</p>
                <p>Settings</p>
            </div>
        </div>
    );
};

export default Sidebar;