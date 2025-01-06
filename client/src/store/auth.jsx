import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token")); // Stores token
  const [userData, setUserData] = useState(null);  // Set initial user data as null
  const authorizationToken = `Bearer ${token}`;
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  // Check for token existence to determine login status
  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setUserData(null); // Clear user data on logout
  };

  // JWT authentication to fetch user data
  const userAuthentication = async () => {
    if (token) { // Check if token exists before fetching
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          method: "GET",
          headers: { Authorization: authorizationToken },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.userData); // Update user data on successful fetch
          console.log(data);
        } else {
          console.error("Error fetching user data:", response.status);
          // Handle potential invalid token or server errors (e.g., logout)
        }
      } catch (error) {
        console.error("Error in Fetching user data", error);
      }
    }
  };

  useEffect(() => {
    userAuthentication(); // Fetch user data on component mount
  }, [token]); // Re-fetch user data on token change

  // Service data fetching
//   const [services, setServices] = useState([]); // Initialize services as an empty array
//   const [isLoading, setIsLoading] = useState(false); // Loading state for services

//   const getServices = async () => {
//     setIsLoading(true); // Set loading state to true
//     try {
//       const response = await fetch("http://localhost:5000/api/data/service", {
//         method: "GET",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setServices(data);
//         console.log(data);
//       } else {
//         console.error("Error fetching services:", response.status);
//       }
//     } catch (error) {
//       console.error("services frontend error:", error);
//     } finally {
//       setIsLoading(false); // Set loading state to false after fetch (regardless of success/failure)
//     }
//   };

//   useEffect(() => {
//     getServices();
//   }, []); // Fetch services on component mount

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        isLoggedIn,
        authorizationToken, // now we can use this token anywhere
        // userData, // Include user data in context
        // services,
        // isLoading, // Include loading state for services
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
