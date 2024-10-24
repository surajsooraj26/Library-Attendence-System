import React, {useContext, useEffect} from "react";
import customer01 from "../../assets/customer01.jpg";
import customer02 from "../../assets/customer02.jpg";
import { DataContext } from "../contexts/DataContext";
import { LogContext } from "../contexts/LogContext";



const New = () => {
  const { logData } = useContext(LogContext);
  const { log, setlog } = useContext(DataContext);


  // useEffect(() => {
  //   if (logData) {
  //     setlog((prevLog) => {
  //       const updatedLog = [...prevLog];
  //       updatedLog.pop(); // Remove the last element
  //       updatedLog.unshift(logData); // Add logData at the beginning of the array
  //       return updatedLog;
  //     });
  //   }
  // }, [logData, setlog]); // Only depend on logData and setlog


  return (
    <div className="recentCustomers">
      <div className="cardHeader">
        <h2>Recent Students</h2>
      </div>
      <table>
        <tbody> 

          {log && log.length > 0 ? (
              log.map((entry, index) => (





                
                <tr key={index}>
                  <td width = "60px"><div className="imgBx">
                <img src={"http://localhost:3500"+entry.profile} alt="" />
              </div></td>
                  <td> <h4>
                {entry.name} <br />
                <span>{entry.regNo}</span>
              </h4></td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4"></td>
              </tr>
            )}
          
        </tbody>
      </table>
    </div>
  );
};

export default New;
