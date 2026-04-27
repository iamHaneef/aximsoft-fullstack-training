import React, { useState } from "react";
import usersData from "../data/Users";
import UserCard from "../components/UserCard/UserCard";
import "./UserManagement.css";

const UserManagement = () => {
    const [users, setUsers] = useState(usersData);
    
    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
    };
    
    const handleView = (user) => {
        alert(`Name: ${user.name}\nEmail: ${user.email}`);
    };

    const handleEdit = (user) => {
        alert(`Edit user: ${user.name}`);
    };

    const handleAddUser = () => {
        alert("Add New User clicked");
    };


    return (
        <div className="usercontainer">
            <div className="header">
                <h2 className="user">User Management</h2>
                <button className="add-btn" onClick={handleAddUser}>
                    Add New User
                </button>            </div>

            <div className="grid">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onDelete={handleDelete}
                        onView={handleView}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserManagement;