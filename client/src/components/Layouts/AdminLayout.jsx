import { Outlet } from "react-router-dom";
import React from 'react';
import "./Admin.css";
import { NavLink } from "react-router-dom";


export const AdminLayout = () => {
    const handleSidebarToggle = () => {
        const sidebar = document.getElementById('sidebar');
        const navbar = document.getElementById('navbar');
        const main = document.querySelector('main');
        sidebar.classList.toggle('active');
        navbar.classList.toggle('active');
        main.classList.toggle('active');
    };

    return (
        <>
            <div id="navbar">
                <button id="sidebar-toggler" onClick={handleSidebarToggle}>&#9776;</button>
                <div id="company-name">Welcome Admin</div>
                <nav id="main-nav">
                    <ul>
                        <li><NavLink to="/">&#10149; Back to Home</NavLink></li>
                    </ul>
                </nav>
            </div>


            <nav id="sidebar" className="sidebar">
                <div className="sidebar-content">
                    <a className="sidebar-brand" href="#">
                        <div className="sidebar-brand-img"><img src="https://avatars.githubusercontent.com/u/123819080?v=4" alt="profile" /></div>
                        <div className="sidebar-brand-name"><span>Harsh Patel</span></div>
                    </a>
                    <ul className="sidebar-nav">
                        <li className="sidebar-header">Pages</li>
                        <li className="sidebar-item"><div className="sidebar-link"><span>&#9783; Dashboard</span></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"> <NavLink to="/admin/users" className="Sidebar-Navlink">&#9823; Users</NavLink></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"> <NavLink to="/admin/contacts" className="Sidebar-Navlink">&#9993; Messages</NavLink></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"> <NavLink to="/admin/services" className="Sidebar-Navlink">&#9881; Services</NavLink></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"><span>&diams; Sign In</span></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"><span>&#9826; Sign Up</span></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"> <NavLink to="/admin" className="Sidebar-Navlink">&#9866; Blank</NavLink></div></li>
                        <li className="sidebar-header">Tools &amp; Components</li>
                        <li className="sidebar-item"><div className="sidebar-link"><span>&#9869; Buttons</span></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"><span>&#10002; Forms</span></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"><span>&#10064; Cards</span></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"><span>&#9999; Typography</span></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"><span>&#10070; Icons</span></div></li>
                        <li className="sidebar-header">Plugins &amp; Addons</li>
                        <li className="sidebar-item active"><div className="sidebar-link"><span>&#8512; Charts</span></div></li>
                        <li className="sidebar-item"><div className="sidebar-link"><span>&#9736; Maps</span></div></li>
                    </ul>
                    <div className="sidebar-cta">
                        <div className="sidebar-cta-content">
                            <strong className="sidebar-cta-heading">&#9818; Developer's details</strong>
                            <div className="sidebar-cta-paragraph">Are you looking for Website's developer?</div>
                            <div className="sidebar-cta-link"><a href="#">Visit Profile</a></div>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                {/* Your main content goes here */}

                <section className="Outlet-Section">
                    <div className="Outlet-Container">
                        <Outlet />  {/* Outlet renders child components within the layout */}
                    </div>
                </section>

            </main>
        </>
    );
};

