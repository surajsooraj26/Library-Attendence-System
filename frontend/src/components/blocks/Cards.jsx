import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LogContext } from "../contexts/LogContext";

const Cards = () => {
  const { details, setDetails } = useContext(LogContext);
  useEffect(() => {
    axios
      .post("http://localhost:3500/total")
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []); // Adding an empty dependency array to run the effect only once after the initial render

  return (
    <div className="cardBox">
      <div className="card">
        <div>
          <div className="numbers">{details.total}</div>
          <div className="cardName">Total Entries</div>
        </div>
        <div className="iconBx">
          <ion-icon name="People-outline" />
        </div>
      </div>
      <div className="card">
        <div>
          <div className="numbers">{details.current}</div>
          <div className="cardName">Status-In</div>
        </div>
        <div className="iconBx">
          <ion-icon name="person-add-outline" />
        </div>
      </div>
      <div className="card">
        <div>
          <div className="numbers">{details.history}</div>
          <div className="cardName">Status-Out</div>
        </div>
        <div className="iconBx">
          <ion-icon name="person-remove-outline" />
        </div>
      </div>
    </div>
  );
};

export default Cards;
