import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CgCloseO } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";
import { SlOptionsVertical } from "react-icons/sl";




const AllUsers = () => {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [editOption, setEditOption] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDisable, setConfirmDisable] = useState(false)
  

  const optionsRef = useRef(null);


  useEffect(() => {
    if (showOptions) {
      document.addEventListener('click', handleClickOutside);
  } else {
      document.removeEventListener('click', handleClickOutside);
  }

    axios
      .get("http://localhost:3500/allstudents")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setStudentList(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setStudentList([]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
      return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, [showOptions]);

  const details = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setEditOption(false);
    setSelectedStudent(null);
    setConfirmDelete(false);
  };
  const edit = () => {
    setEditOption(true)
    setShowOptions(prevState => !prevState);
  };
 
const deleteConfirm = () =>{
  setConfirmDelete(true)
}

const disableConfirm = () =>{
  setConfirmDisable(true)

}


  const toggleOptions = () => {
    setShowOptions(prevState => !prevState);
  };
  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
    }
};

const handleSelectChange = (e) => {
  setSelectedOption(e.target.value);
};

const handleCancel = () => {
  setConfirmDelete(false);
  setConfirmDisable(false);
};

const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  const formData = {
    name: event.target[0].value,
    regNo: event.target[1].value,
    programme: event.target[2].value,
    duration: {
      start: event.target[3].value,
      end: event.target[4].value,
    },
    gender: event.target[5].value,
    phone: event.target[6].value,
    address: event.target[7].value,
  };

  try {
    const response = await axios.put('http://localhost:3500/editUser', formData);

    // Assuming the response contains the updated student object
    const updatedStudent = response.data.updatedStudent;

    setSelectedStudent(response.data.updatedStudent); // Update the selectedStudent state
    const updatedStudentList = studentList.map((student) =>
      student.regNo === updatedStudent.regNo ? updatedStudent : student
    );

    // Update the state with the modified list
    setStudentList(updatedStudentList);

    console.log('Data updated successfully:', response.data);

    setEditOption(false)
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

const deleteUser = async (regNo) => {
  try {
    // Send a DELETE request to the server with the regNo
    await axios.delete(`http://localhost:3500/deleteUser/${regNo}`);

    // Set the confirm delete state to false to close the confirmation dialog
     setConfirmDelete(false);

    // Optionally, refresh the data or handle UI updates after deletion
    console.log("Record deleted");

    // You might want to update the UI here, like refreshing the list of students or showing a success message
  } catch (error) {
    console.error("There was an error deleting the record:", error);
    // Optionally, handle error scenarios like showing an error message to the user
  }
};

const disableUser = async (regNo) => {
  try {
    // Send the regNo in the request body
    const response = await axios.post('http://localhost:3500/disableUser', {
      regNo: regNo  // Pass regNo in the request body
    });

    const updatedStudent = response.data.updatedStudent;

    setSelectedStudent(response.data.updatedStudent); // Update the selectedStudent state
    const updatedStudentList = studentList.map((student) =>
      student.regNo === updatedStudent.regNo ? updatedStudent : student
    );
    setStudentList(updatedStudentList);

    // Set confirmation disable state

    setConfirmDisable(false);
    console.log(responce)
  } catch (err) {
    console.log("There was an error disabling the user", err);
  }
};


  return (
    <div className="main">
      <div className="details3">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>All Users</h2>
            <SlOptionsVertical />
          </div>
          {/*<button
            className="filter"
            onClick={() => setFilterVisible(!isFilterVisible)}
            style={{ marginBottom: "15px" }}
          >
            Filter
            <CiFilter className="filter-icon" />
          </button>*/}
          {isFilterVisible && (



            <div className="filter-panel">
              <h2 className="h2">Filter Options</h2>
              <form>
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
  <label htmlFor="startYear" className="form-label">Start Year</label>
  <select id="startYear" name="startYear" className="form-control">
    <option value="">Select Year</option>
    {Array.from({ length: 100 }, (_, i) => {
      const year = new Date().getFullYear() - i;
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    })}
  </select>
</div>

<div className="form-group">
  <label htmlFor="startYear" className="form-label">End Year</label>
  <select id="startYear" name="startYear" className="form-control">
    <option value="">Select Year</option>
    {Array.from({ length: 100 }, (_, i) => {
      const year = new Date().getFullYear() - i;
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    })}
  </select>
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
                <td> </td>
                <td>Register Number</td>
                <td>Name</td>
                <td>Programme</td>
                <td>Batch</td>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student, index) => (
                <tr key={index} onClick={() => details(student)} style={{ cursor: "pointer" }}>
                  <td>{index+1}</td>
                  <td width="60px">
                    <div className="imgBx">
                      <img
                        src={"http://localhost:3500" + student.profile}
                        alt=""
                      />
                    </div>
                  </td>
                  <td>{student.regNo}</td>
                  <td>{student.name}</td>
                  <td>{student.programme}</td>
                  <td>{student.duration.start + "-" + student.duration.end}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedStudent && (
          <div className="modal1">
            <div className="modalContent">
              
              

            <CgCloseO className="close-container1" onClick={closeModal}/>
              
                <div className="option-container" ref={optionsRef}>
                <div className="option" onClick={toggleOptions}>

                <SlOptionsVertical />
                </div>
                {showOptions && (
                <div className="options-menu">
                    <div className="option-item1" onClick={edit}>Edit</div>
                    <div className="option-item2" onClick={disableConfirm}>
  {selectedStudent.status === true || selectedStudent.status === undefined ? 'Disable' : 'Enable'}
</div>
                    {/* <div className="option-item2" onClick={deleteConfirm}>Delete</div> */}
                    
                </div>
            )}
            </div>
                  {editOption ? (
                <form onSubmit={handleSubmit}>

                <table>

                <tr>
                  <td rowSpan={4} width={230}>
                <div className="selected_profile">
                  <img  className="image-class"
                    src={"http://localhost:3500" + selectedStudent.profile}
                    alt=""
                
                  />
                </div>
                  </td>
              <td width={210}>
              <label>Name</label>
              <input
                    type="text"
                    defaultValue={selectedStudent.name}
                    autoFocus
                />
                  </td>
                  <td> </td>
                  <td>
                    <label>Register Number</label>
                  <input
                    type="text"
                    defaultValue={selectedStudent.regNo}
                />

                  </td>
                </tr>
                <tr>
                  <td width={210}>
                  <label>Programme</label>
                    <select
                    
                    defaultValue={selectedStudent.programme}
                    >
                     <option value="">-- Select --</option>
                  <option value="MSc Computer Science">
                    MSc Computer Science
                  </option>
                  <option value="MSc Computer Science(AI)">
                    MSc Computer Science(AI)
                  </option>
                  <option value="MSc Computer Science(ML)">
                    MSc Computer Science(ML)
                  </option>
                  <option value="M.tech">M.tech</option>
                    </select>
                  </td>
                  <td> &nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td>
                    <label>Starting</label>
                    <input
                    type="number"
                    defaultValue={selectedStudent.duration.start}
                      />
                  </td>
                  <td> &nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td>
                    <label>Ending</label>
                    <input
                    type="number"
                    defaultValue={selectedStudent.duration.end}
                      />
                  </td>
                 
                </tr>
             <tr>
               <td>
                <label>Gender</label>
                <select
                name="gender"
                defaultValue={selectedStudent.gender}>
                   <option value="">-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                
                
                </td>
                <td> &nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td>
                    <label>Phone Number</label>
                    <input
                    type="number"
                    defaultValue={selectedStudent.phone}
                      />
                  </td>
                  <td> &nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td>
                    <label>Address</label>
                    <input type="text" name="address" id="address" defaultValue={selectedStudent.address}/>

                  </td>
                  </tr>
                  <div className="button">
                  <tr>
                <td> <button type="submit" className="btn btn-primary">
              Save
            </button></td>
            </tr>
            </div>

                
                </table>
                </form>
            ) : (
              <table>

                <tr>
                  <td rowSpan={4} width={230}>
                <div className="selected_profile">
                  <img  className="image-class"
                    src={"http://localhost:3500" + selectedStudent.profile}
                    alt=""
                
                  />
                </div>
                  </td>
              <td width={210}>

                <p> {selectedStudent.name}</p>
                  </td>
                  <td>
                <p> {selectedStudent.regNo}</p>

                  </td>
                </tr>
                <tr>
                  <td width={210}>

                <p> {selectedStudent.programme}</p>
                  </td>
                  <td>
                <p> {selectedStudent.duration.start + "-" + selectedStudent.duration.end}</p>

                  </td>
                </tr>
             <tr>
               <td > 
                <p>{selectedStudent.gender}</p>
                </td>
                <td>
                <p>{selectedStudent.phone}</p>
                </td>
                </tr>
                <tr>
                <td width={50}>
                <p>{selectedStudent.address}</p>
                </td>
                </tr>

                </table>
            )}
            
              </div>
            </div>
          
        )}
      </div>
      {confirmDelete && (
        <div className="popup-overlay">
          <div className="confirmation-dialog">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={() => deleteUser(selectedStudent.regNo)}>OK</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
     {confirmDisable && (
  <div className="popup-overlay">
    <div className="confirmation-dialog">
      <p>
        {selectedStudent.status === true || selectedStudent.status === undefined
          ? "Are you sure you want to disable this user?"
          : "Are you sure you want to enable this user?"}
      </p>
      <button onClick={() => disableUser(selectedStudent.regNo)}>OK</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  </div>
)}

    </div>
  );
};

export default AllUsers;
