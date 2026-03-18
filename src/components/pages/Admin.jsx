// import React from "react";

// const Admin = () => {
//   return (
//     <div className="admin">
//       <h1>Admin Page</h1>
//       <p>Welcome to the admin page!</p>
//     </div>
//   );
// };
// export default Admin;

// components/Admin.jsx

import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUserById } from "../../services/adminService";
import { FaTrash } from "react-icons/fa";
import "./Admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserById(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>ChintuVerse members</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(user._id)}
                    title="Delete user"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
