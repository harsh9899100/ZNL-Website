import React, { useState } from 'react';
import '../Styles/All-Form.css'; // Importing the CSS file
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify'; // for stylish alerts

export const Register = () => { 

    const countries = [
        { code: 'IN', name: 'India' },
        { code: 'US', name: 'United States' },
        { code: 'CA', name: 'Canada' },
        // Add more countries as needed
    ];

    const navigate = useNavigate(); // We will use this below
    const { storeTokenInLS } = useAuth; // token storing at local storage

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        country: '',
        termsAccepted: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData); // For testing

        try {

            const response = await fetch(`http://localhost:5000/api/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            
                const res_data = await response.json();
                console.log("res from server", res_data.extraDetails);

            if (response.ok) {
                toast.success("Registration Successfully Completed");
                setFormData({ username: "", email: "", phoneNumber: "",password: "" });

                // Storing the token in local storage
                storeTokenInLS(res_data.token);

                navigate("/login"); // if registration successful --> redirected to login page
                
                // console.log(response); // let's check in console
            } else {
               toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message); 
               // throw the error if it is available in extraDetails otherwise throw default error
            }
            

        } catch (error) {
            console.log("error from register", error);
        }

    };

    return (
        <>
        <section className="form-section">
        <div className="form-div">
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-section-heading">&#x274D; Registration</div>

                <div className="form-group">
                    <label htmlFor="username">&#9823; Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">&#x2709; Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">&#x2706; Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">&#x267E; Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="country">&#9872; Country/Region</label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required>
                        <option value="">Select Country/Region</option>
                        {countries.map(country => (
                            <option key={country.code}
                                value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <div className="form-group-terms">
                        <div className="form-group-terms-checkbox">
                            <input type="checkbox"
                                id="termsAccepted"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange} required />
                        </div>
                        <div className="form-group-terms-text">
                            <label htmlFor="termsAccepted">
                                I agree to the Terms of Service and Privacy Policy
                            </label>
                        </div>
                    </div>
                </div>

                {/*  Captcha/Verification mechanism  */}
                <div className="form-group">
                    <button className="form-submit-btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
        </section>
        </>
    );
}
