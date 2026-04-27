import React from "react";
import "./UserCard.css";

const UserCard = ({ user, onDelete, onView, onEdit }) => {
    return (
        <div className="card">
            <img src={user.image} alt={user.name} className="img" />
            <h3 className="name">{user.name}</h3>
            <p className="email"> {user.email}</p>

            <div className="actions">
                <button className="btn light" onClick={() => onView(user)}>
                    View
                </button>

                <button className="btn light" onClick={() => onEdit(user)}>
                    Edit
                </button>

                <button className="btn dark" onClick={() => onDelete(user.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;