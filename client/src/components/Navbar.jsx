import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Navbar = () => {
    const { isLoggedIn } = useAuth() || {}; // Ensure isLoggedIn is initialized with an empty object if useAuth returns falsy value
    return (
        <>
            <header>
                <div className="header-container">
                    <div className="header-logo-container">
                        <NavLink to="">ZNL Software Solutions</NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/services">Services</NavLink></li>
                            <li><NavLink to="/about">About us</NavLink></li>
                            <li><NavLink to="/contactus">Contact us</NavLink></li>
                            {isLoggedIn ?
                                (
                                    <li><NavLink to="/logout">Logout</NavLink></li>
                                ) : (
                                <>
                                    <li><NavLink to="/register">Register</NavLink></li>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                </>
                                )
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}
