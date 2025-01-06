import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { authorizationToken } = useAuth();

    useEffect(() => {
        setIsLoading(true); // Set loading state to true
        setError(null); // Clear any previous errors

        fetch("http://localhost:5000/api/admin/contacts", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => {
                console.error("Error fetching contacts:", error);
                setError("Error retrieving contacts. Please try again."); // Set a user-friendly error message
            })
            .finally(() => setIsLoading(false)); // Set loading state to false after request finishes
    }, []);

    const deleteContact = async (contactId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/${contactId}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete contact.");
            }

            const updatedContacts = contacts.filter(contact => contact._id !== contactId);
            setContacts(updatedContacts);
        } catch (error) {
            console.error("Error deleting contact:", error);
            setError("An error occurred while deleting the contact. Please try again.");
        }
    };

    // Function for handling edit (implementation depends on your backend API)
    const handleEditContact = (contactId) => {
        // Implement logic to handle editing a contact based on your backend API requirements
        // This might involve redirecting to an edit contact page or displaying an edit form within the component
    };

    return (
        <>
            <h1>Messages controller by Admin panel </h1>
            <div>
                {isLoading && <p>Loading contacts...</p>}
                {error && <p>Error: {error}</p>}
                {contacts.length > 0 ? (
                    <table className="contact-data-table">
                        <thead>
                            <tr>
                                <th className="table-header">Username</th>
                                <th className="table-header">Email</th>
                                <th className="table-header">Message</th>
                                {/* <th className="table-header">Edit</th> */}
                                {/* <th className="table-header">Delete</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => (
                                <tr key={contact._id} className="table-row">
                                    <td>{contact.username}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.message}</td>
                                    {/* <td> 
                                        <button onClick={() => handleEditContact(contact._id)}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteContact(contact._id)}>Delete</button>
                                    </td>*/}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No contacts found.</p>
                )}
            </div>
        </>
    );
};
