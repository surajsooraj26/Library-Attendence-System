import React, { useEffect, useRef, useContext, useState } from "react";
import { LogContext } from "../contexts/LogContext";
import axios from "axios";
import customer01 from "../../assets/customer01.jpg";

const Main = ({ setCurrentView }) => {
  const { setlogData, setDetails } = useContext(LogContext);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showStatusConfirmation, setStatusShowConfirmation] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (inputRef.current && e.target !== inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleEnterKeyPress = async (e) => {
      if (e.key === "Enter") {
        const regno = inputRef.current.value;
        try {
          const response = await axios.post("http://localhost:3500/log", { regno });
          setlogData(response.data);
          inputRef.current.value = ""; // Clear the input field
           if(response.data.state === true){
            setStatusShowConfirmation(true)
          }
          else if (!response.data.exist) {
            setShowConfirmation(true); // Show the confirmation dialog if response.data.exist is false
          } else {
            axios.post("http://localhost:3500/total")
              .then((response) => {
                console.log("Received response from server:", response.data);
                setDetails(response.data);
              })
              .catch((err) => {
                console.log("Error fetching data:", err);
              });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    document.body.addEventListener("click", handleBodyClick);
    inputRef.current.addEventListener("keypress", handleEnterKeyPress);

    // Focus input on mount
    inputRef.current.focus();

    // Clean up event listeners on unmount
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
      if (inputRef.current) {
        inputRef.current.removeEventListener("keypress", handleEnterKeyPress);
      }
    };
  }, [setlogData, setDetails]);

  const handleConfirm = () => {
    setCurrentView('register'); // Set the current view to 'register' if the user confirms
    setShowConfirmation(false); // Hide the confirmation dialog
  };
  
  const handleCancel = () => {
    setStatusShowConfirmation(false);
    setShowConfirmation(false); // Hide the confirmation dialog without changing the view
  };

  return (
    <div>
      <div className="topbar">
        <div className="toggle">
          <ion-icon name="menu-outline" />
        </div>
        <div className="search">
          <label>
            <input ref={inputRef} type="text" placeholder="Search here" />
            <ion-icon name="search-outline" />
          </label>
        </div>
        <div className="user">
          {/* <img src={customer01} alt="" /> */}
        </div>
      </div>
      {showConfirmation && (
        <div className="popup-overlay">
          <div className="confirmation-dialog">
            <p>Record doesn't exist!</p>
            <button onClick={handleConfirm}>OK</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
      {showStatusConfirmation && (
        <div className="popup-overlay">
          <div className="confirmation-dialog">
            <p>Access Denied</p>
            <button onClick={handleCancel}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
