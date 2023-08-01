import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // The login function is responsible for handling the login API call
  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:4000/login", inputs, {
        withCredentials: true,
      });

      // Assuming the API returns user data upon successful login
      setCurrentUser(res.data);
    } catch (error) {
      console.log("Login failed. Error:", error.response?.data?.message || "An error occurred");
      setCurrentUser(null); // Set currentUser to null in case of login failure
      throw error; // Rethrow the error to handle it in the component that uses the login function
    }
  };

  useEffect(() => {
    // When the component mounts, check if user data is available in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Memoize the value provided to AuthContext using useMemo
  const authContextValue = useMemo(() => ({ currentUser, login }), [
    currentUser,
    login,
  ]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
