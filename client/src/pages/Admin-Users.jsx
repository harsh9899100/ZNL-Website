import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("username");
    const [sortAsc, setSortAsc] = useState(true);
    const { authorizationToken } = useAuth();

    useEffect(() => {
        setIsLoading(true); // Set loading state to true
        setError(null); // Clear any previous errors

        fetch("http://localhost:5000/api/admin/users", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => {
                console.error("Error fetching users:", error);
                setError("Error retrieving users. Please try again."); // Set a user-friendly error message
            })
            .finally(() => setIsLoading(false)); // Set loading state to false after request finishes
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase()); // Convert search term to lowercase for case-insensitive search
    };

    const handleSortClick = (column) => {
        setSortBy(column);
        setSortAsc(!sortAsc); // Toggle sort order on each click
    };

    const sortUsers = (usersData) => {
        const sortedUsers = [...usersData]; // Create a copy to avoid mutating original state

        sortedUsers.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) {
                return sortAsc ? -1 : 1;
            }
            if (a[sortBy] > b[sortBy]) {
                return sortAsc ? 1 : -1;
            }
            return 0;
        });

        return sortedUsers;
    };

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete user.");
            }

            const updatedUsers = users.filter(user => user._id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("An error occurred while deleting the user. Please try again.");
        }
    };

    // Function for handling edit (implementation depends on your backend API)
    const handleEditUser = (userId) => {
        // Implement logic to handle editing a user based on your backend API requirements
        // This might involve redirecting to an edit user page or displaying an edit form within the component
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    const sortedAndFilteredUsers = sortUsers(filteredUsers);

    return (
        <>
        <h1>Users controller by Admin panel </h1>
        <div>
            {isLoading && <p>Loading users...</p>}
            {error && <p>Error: {error}</p>}
            {users.length > 0 ? (
                <div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <table className="user-data-table">
                        <thead>
                            <tr>
                                <th
                                    className="table-header"
                                    onClick={() => handleSortClick("username")}
                                >
                                    Username {sortBy === "username" && (sortAsc ? "⬆️" : "⬇️")}
                                </th>
                                <th className="table-header" onClick={() => handleSortClick("email")}>
                                    Email {sortBy === "email" && (sortAsc ? "⬆️" : "⬇️")}
                                </th>
                                <th className="table-header">Phone Number</th>
                                <th className="table-header">Country</th>
                                <th className="table-header">isAdmin</th>
                                {/* <th className="table-header">Created At</th> */}
                                {/* <th className="table-header">Updated At</th> */}
                                <th className="table-header">Edit</th>
                                <th className="table-header">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndFilteredUsers.map(user => (
                                <tr key={user._id} className="table-row">
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.country}</td>
                                    <td>{user.isAdmin.toString()}</td>
                                    {/* <td>{new Date(user.createdAt).toLocaleString()}</td> */}
                                    {/* <td>{new Date(user.updatedAt).toLocaleString()}</td> */}
                                    <td>
                                        <button onClick={() => handleEditUser(user._id)}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No users found.</p>
            )}
        </div>

        </>
    );
};

