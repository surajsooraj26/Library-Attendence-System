import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Change to camel case and ensure default import
import Home from "./components/Home";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken); // Update function call to camel case
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
      } else {
        setToken(storedToken);
      }
    }
  }, []);

  return (
    <div>
      {!token ? <div className="App">
          <Home setToken={setToken} />
          <Footer />
        </div>
        : <Dashboard token={token} />}
    </div>
  );
};

export default App;
