import React, { useState } from 'react';
import '../Styles/All-Form.css'; // Importing the CSS file
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify'; // Stylish alerts

export const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate(); // We will use this below
    const { storeTokenInLS } = useAuth(); // token storing at local storage

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // console.log(formData); // For testing

        try {

            const response = await fetch(`http://localhost:5000/api/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

            console.log(response); // let's check in console

            const res_data = await response.json(); // json format of data

            if (response.ok) {
                toast.success("Login Successfully");
                storeTokenInLS(res_data.token);

                setFormData({ email: "", password: "" });

                navigate("/"); // if login successful we will redirected to home page
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message); 
               // throw the error if it is available in extraDetails otherwise throw default error
                console.log("Invalid credentials");
            }

        } catch (error) {
            console.log("error from login", error);
        }
    };

    return (
        <>      

        <section className="form-section">
        <div className="form-div">
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-section-heading">&#x274D; Login</div>

                <div className="form-group">
                    <label htmlFor="email">&#x2709; Email Address</label>
                    <input type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">&#x267E; Password</label>
                    <input type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required />
                </div>

                <div className="form-group">
                    <button className="form-submit-btn" type="submit">Login</button>
                </div>
            </form>
        </div>
            
        </section>  
        
        
        </>
    );
}
