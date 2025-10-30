import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./PageLayout.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        console.log("👤 User API response:", response.data);

        // Handle { success: true, users: [...] }
        const data =
          Array.isArray(response.data)
            ? response.data
            : response.data.users || [];

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.warn("Unexpected user data format:", response.data);
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="page">
      <h2>Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="card-container">
          {users.map((user) => (
            <div key={user._id} className="card">
              <h3>{user.name || "Unnamed User"}</h3>
              <p>
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {user.role || "User"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
