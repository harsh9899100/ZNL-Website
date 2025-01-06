import { useState } from "react";
import { toast } from 'react-toastify'; // for stylish alerts

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactFormData);

    // lets tackle our handleInput
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };

    // handle fomr getFormSubmissionInfo ------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/form/contact" , {
                method: "POST",
                headers: {'Content-Type':"application/json"},
                body: JSON.stringify(contact),
            });

            if(response.ok){
                setContact(defaultContactFormData);
                const data = await response.json();
                console.log(data);
                toast.success("Message sent Successfully");
            } else {
                toast.error("Your message is not delivered");
            }
        } catch (error) {
            alert("Message not Delivered");
            console.log("Error in sending contact data to backend",error);
        }
    };



    return (
        <>
            <section className="form-section">

                <div className="form-div">
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="form-section-heading">&#x274D; Contact US</div>

                        <div className="form-group">
                            <label htmlFor="username">&#9823; User Name</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                value={contact.username}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">&#x2709; Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="off"
                                value={contact.email}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">&#x270E; Message here</label>
                            <textarea
                                name="message"
                                id="message"
                                autoComplete="off"
                                value={contact.message}
                                onChange={handleInput}
                                required
                                cols="30"
                                rows="6"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="form-submit-btn" >submit</button>
                        </div>
                    </form>
                </div>
            </section>

            <section className="location-section">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d458.90571527183334!2d72.51998451890984!3d23.05145130792215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b4effef3651%3A0xd6f35b34cd17a834!2sZNL%20Software%20Solutions!5e0!3m2!1sen!2sin!4v1713006520933!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </>
    );
};