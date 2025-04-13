import { createContext, useContext, useState, useEffect } from "react";

export const AgencyAuthContext = createContext();

export const AgencyAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("agency_token"));
  const [agency, setAgency] = useState(null);
  const [application, setApplication] = useState(null);
  const authorizationToken=`Bearer ${token}`
  // Function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("agency_token", serverToken);
  };

  // Function to retrieve the token
  const getToken = () => token;

  // Check if the agency is logged in
  const isLoggedInAgency = !!token;
  console.log("Is logged in:", isLoggedInAgency);

  // Function to logout agency
  const LogoutAgency = () => {
    setToken(null);
    setAgency(null);
    localStorage.removeItem("agency_token");
  };

  // JWT Authentication - to get the currently logged in agency data
  const agencyAuthentication = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/agency_data", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,  // Use the `token` state variable
        },
      });

      if (response.ok) {
        const agency_data = await response.json();
        console.log("Agency data", agency_data.agencyData);
        setAgency(agency_data.agencyData); // Set the correct field
      } else if (response.status === 401) {
        // Token invalid or expired, log the agency out
        console.log("Token invalid/expired. Logging out...");
        LogoutAgency();
      } else {
        console.log('Failed to fetch agency data:', response.status);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  // Fetching applications from db
  const getApplications = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/agencyApplications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Pass token for authentication
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched applications:", data);
        setApplication(data.n);
      } else if (response.status === 401) {
        // Token invalid or expired, log the agency out
        console.log("Token invalid/expired. Logging out...");
        LogoutAgency();
      } else {
        console.log(`Failed to fetch applications. Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`Application not found: ${error.message}`);
    }
  };

  useEffect(() => {
    getApplications();
    agencyAuthentication();
  }, [token]);

  return (
    <AgencyAuthContext.Provider value={{ isLoggedInAgency, storeTokenInLS, LogoutAgency, agency, getToken,authorizationToken }}>
      {children}
    </AgencyAuthContext.Provider>
  );
};

export const useAgencyAuth = () => {
  const authContextValue = useContext(AgencyAuthContext);
  if (!authContextValue) {
    throw new Error("useAgencyAuth must be used within an AgencyAuthProvider");
  }
  return authContextValue;
};
