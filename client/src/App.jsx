import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Homepage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/ContactUS";
import { Navbar } from "./components/Navbar";
import { Error404 } from "./pages/ErrorPage";
import { Footer } from "./components/ZNL-Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/Layouts/AdminLayout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminServices } from "./pages/Admin-Services";

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error404 />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />            
            <Route path="services" element={<AdminServices />} />
          </Route>

        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  )
};

export default App; // we have to use this default EXPORT method to link it with the """main.jsx""" file.
