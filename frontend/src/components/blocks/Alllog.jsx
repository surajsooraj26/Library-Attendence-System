import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AllLog = () => {
  const [totalLog, setTotalLog] = useState([]);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = (filters = {}) => {
    axios
      .post("http://localhost:3500/all_log", filters)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTotalLog(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setTotalLog([]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const filter = (event) => {
    event.preventDefault();
    const filterType = event.target.select.value;
    const search = event.target.search.value;
    const startDate = event.target.startDate.value;
    const endDate = event.target.endDate.value;
    const sortOrder = event.target.sortOrder.value;

    const filters = {
      filterType: filterType,
      search: search,
      startDate: startDate,
      endDate: endDate,
      sort: sortOrder === "asc" ? 1 : sortOrder === "desc" ? -1 : undefined,
    };

    fetchLogs(filters);
    setFilterVisible(false);
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    doc.autoTable({
      head: [["Register Number", "Name", "Programme", "Date", "In Time", "Out Time"]],
      body: totalLog.map((log) => [
        log.regNo,
        log.name,
        log.programme,
        log.date,
        log.in_time,
        log.out_time,
      ]),
    });

    doc.save("Activity_Log.pdf");
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="main">
      <div className="details3">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>Activity Log</h2>
           
            <button className="btn" onClick={handlePrint}>
              Print
            </button>
            </div>
       <legend>    
   <span className="color-box"></span>
   <span className="legend-text">Automatically Timed Out</span>
   </legend>
 

          <button
            className="filter"
            onClick={() => setFilterVisible(!isFilterVisible)}
            style={{ marginBottom: "15px" }}
          >
            Filter
            <CiFilter className="filter-icon" />
          </button>

          {isFilterVisible && (
            <div className="filter-panel">
              <h2 className="h2">Filter Options</h2>
              <form onSubmit={filter}>
                <div className="form-group1">
                  <label htmlFor="select" className="form-label">Search</label>
                  <select id="select" name="select" className="form-control1" onChange={handleSelectChange}>
                    <option value=""></option>
                    <option value="regNo">Register Number</option>
                    <option value="name">Name</option>
                    <option value="programme">Programme</option>
                  </select>
                </div>
                <div className="form-group">
                  {selectedOption === 'programme' ? (
                    <select id="search" name="search" className="form-control">
                      <option value="MSc Computer Science">MSc Computer Science</option>
                      <option value="MSc Computer Science(AI)">MSc Computer Science(AI)</option>
                      <option value="MSc Computer Science(ML)">MSc Computer Science(ML)</option>
                      <option value="M.tech">M.tech</option>
                      {/* Add more options as needed */}
                    </select>
                  ) : (
                    <input
                      type="text"
                      id="search"
                      name="search"
                      className="form-control"
                      placeholder="Search..."
                    />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <input type="date" id="startDate" name="startDate" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <input type="date" id="endDate" name="endDate" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="sortOrder" className="form-label">Sort Order</label>
                  <select id="sortOrder" name="sortOrder" className="form-control">
                    <option value="desc"></option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-secondary">
                  Filter
                </button>
                <button
                  type="button"
                  onClick={() => setFilterVisible(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </form>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <td>Sl No</td>
                <td>Register Number</td>
                <td>Name</td>
                <td>Programme</td>
                <td>Date</td>
                <td>In Time</td>
                <td>Out Time</td>
              </tr>
            </thead>
            <tbody>
              {totalLog.map((log, index) => (
                
                // <tr key={index} style={{ backgroundColor: log.timer ? '#e06161' : '',
                // borderRadius: log.timer ?  "8px" : "",
                // }}>

                <tr 
                key={index} 
                className={log.timer ? 'timer-active' : ' '} // Conditional class application
              >
                  <td>{index+1}</td>
                  <td>{log.regNo}</td>
                  <td>{log.name}</td>
                  <td>{log.programme}</td>
                  <td>{log.date}</td>
                  <td>{log.in_time}</td>
                  <td>{log.out_time}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllLog;
