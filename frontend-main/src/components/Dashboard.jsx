// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LogContext } from "./contexts/LogContext";
import { DataContext } from "./contexts/DataContext";
import Form from "./blocks/Form";
import AllLog from "./blocks/Alllog";
import AllUsers from "./blocks/AllUsers";

import LogComponent from "./LogComponent";

import Slidebar from "./blocks/Slidebar";
import Main from "./blocks/Main";
import Cards from "./blocks/Cards";
import Table from "./blocks/Table";
import New from "./blocks/New";

const Dashboard = ({ token }) => {
  const [message, setMessage] = useState("");
  const [logData, setlogData] = useState(null);
  const [log, setlog] = useState(null);
  const [details, setDetails] = useState([]);

  const [activeComponent, setActiveComponent] = useState(null);
  const [currentView, setCurrentView] = useState("main"); // State to track current view

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get("http://localhost:3500/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(
            "http://localhost:3500/log/10" /*{} verification headers not sent*/
          ),
        ]);

        setMessage(response1.data.message);
        setlog(response2.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="container">
      <Slidebar onLinkClick={(view) => setCurrentView(view)} />
      {currentView === "main" && (
        <div className="main">
          <LogContext.Provider
            value={{ logData, setlogData, setDetails, details }}
          >
            <Main setCurrentView={setCurrentView} /> {/* Pass setCurrentView */}
            <Cards />
            <div className="details">
              <DataContext.Provider value={{ log, setlog }}>
                <Table onLinkClick={(view) => setCurrentView(view)} />
                <New />
              </DataContext.Provider>
            </div>
          </LogContext.Provider>
        </div>
      )}
      {currentView === "register" && (
        <div className="main">
          <Form />
        </div>
      )}
      {currentView === "activitylog" && <AllLog />}
      {currentView === "userslist" && <AllUsers />}
    </div>
  );
};

export default Dashboard;






