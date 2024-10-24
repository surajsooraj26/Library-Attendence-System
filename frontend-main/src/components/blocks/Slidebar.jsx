import React from "react";
import BannerBackground from "../../assets/Logo2.svg";

const Slidebar = ({ onLinkClick }) => {
  function signout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <div className="navigation">
      <ul>
        <li>
          <a href="#" onClick={() => onLinkClick("main")}>
          <img src={BannerBackground} alt="" />
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick("main");
            }}
          >
            {" "}
            <span className="icon">
              <ion-icon name="home-outline" />
            </span>
            <span className="title">Dashboard</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick("activitylog");
            }}
          >
            {" "}
            <span className="icon">
              <ion-icon name="list-outline" />
            </span>
            <span className="title">Activity log</span>
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick("userslist");
            }}
          >
            {" "}
            <span className="icon">
              <ion-icon name="people-outline" />
            </span>
            <span className="title">All Users</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick("register");
            }}
          >
            <span className="icon">
              <ion-icon name="person-outline" />
            </span>
            <span className="title">Add User</span>
          </a>
        </li>
        {/* <li>
          <a href="#" onClick={(e) => {
              e.preventDefault();
              signout();
            }}
          >
            <span className="icon">
              <ion-icon name="settings-outline" />
            </span>
            <span className="title">Settings</span>
          </a>
        </li> */}
        {/* <li>
          <a href="#">
            <span className="icon">
              <ion-icon name="lock-closed-outline" />
            </span>
            <span className="title">Password</span>
          </a>
        </li> */}
        <li>
          <a href="#" onClick={(e) => {
              e.preventDefault();
              signout();
            }}>
            <span className="icon">
              <ion-icon name="log-out-outline" />
            </span>
            <span className="title">Sign Out</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Slidebar;
