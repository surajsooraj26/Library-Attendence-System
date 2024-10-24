const axios = require("axios")
const { currentModel, historicalModel } = require("../models/log");

const someCondition = () => {

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  if ((hours === 12 && minutes === 18) || (hours === 16 && minutes === 30)) {
    return true;
  }
  return false;
  };
  
  const executeTask = async() => {
    try {
      // Query the collection for all documents
      const documents = await currentModel.find({});
      
      for (const entry of documents) {
        try {
          const history = new historicalModel({
            regNo: entry.regNo,
            name: entry.name,
            in_time: entry.in_time,
            out_time: new Date(),
            timer: true,
          });
          await history
            .save()
            .then(async (outResponse) => {
              await currentModel.deleteOne({ regNo: entry.regNo });
        })
        .catch((err)=>{
          console.log(err)
        })
        } catch (error) {
          console.error('Error executing task for regNo:', doc.regNo, error);
        }
      }
    } catch (error) {
      console.error('Error querying the collection:', error);
    }
  
  };
  
  const startTimer = () => {
    setInterval(() => {
      if (someCondition()) {
        executeTask();
      }
    }, 100 ); // Check every 10 seconds (adjust as needed)
  };
  
  module.exports = {
    startTimer
  };
  