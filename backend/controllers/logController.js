const { currentModel, historicalModel } = require("../models/log");
const { format } = require("date-fns");
const studentModel = require("../models/student");

const dashboardLog = async (req, res) => {
  try {
    const { id } = req.params;
    const num = Number(id);
    const currentData = await currentModel.find().sort({ _id: -1 }).limit(num);
    const historicalData = await historicalModel
      .find()
      .sort({ _id: -1 })
      .limit(num);
    const combinedData = [...currentData, ...historicalData].sort(
      (a, b) => b.createdAt - a.createdAt
    );
    const newestCombinedData = combinedData.slice(0, num);

    const data = [];

    for (let i = 0; i < newestCombinedData.length; i++) {
      const item = newestCombinedData[i];
      const { regNo, name, in_time, out_time, timer } = item;
      try{

        const programmeObject = await studentModel
          .findOne({ regNo: regNo })
          .select("-_id programme duration profile regNo");
          programme = programmeObject.programme;
          duration = programmeObject.duration;
          profile = programmeObject.profile;
      }
      catch{
        programme ="null"
        duration = "null"
        profile = "null"
      }

      

      data.push({
        name,
        programme,
        duration,
        timer,
        regNo:regNo,
        profile:profile,
        in_time: format(out_time || in_time, "hh:mm:ss a  dd-MM-yyyy"),
        status: out_time ? "OUT" : "IN",
      });
    }
    while (data.length < 10) {
      data.push({
        name: "",
        programme: "",
        duration: "",
        timer: "",
        in_time: "",
        status: "",
      });
    }

    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const activityLog = async (req, res) => {
  const regNo = req.body.regno;
  const data = await studentModel
    .findOne({
      regNo: regNo,
    })
    .then(async (responceObject) => {
      if (responceObject && responceObject.status === true) {

        //In part
        const entry = await currentModel.findOne({
          regNo: responceObject.regNo,
        });


        if (!entry) {
          const attendance = new currentModel({
            regNo: responceObject.regNo,
            name: responceObject.name,
            in_time: new Date(),
          });
          await attendance.save().then(async (response) => {
            const data = {
              name: response.name,
              programme: responceObject.programme,
              profile: responceObject.profile,
              regNo: responceObject.regNo,
              in_time: format(response.in_time, "hh:mm:ss a  dd-MM-yyy"),
              duration: responceObject.duration,
              status: "IN",
              exist: true,
            };

            await res.json(data);
          });
        } else {
          //Out part
          const history = new historicalModel({
            regNo: entry.regNo,
            name: entry.name,
            in_time: entry.in_time,
            out_time: new Date(),
          });
          await history
            .save()
            .then(async (outResponse) => {
              await currentModel.deleteOne({ regNo: entry.regNo });
              const data = {
                name: outResponse.name,
                programme: responceObject.programme,
                duration: responceObject.duration,
                profile: responceObject.profile,
                regNo: responceObject.regNo,  
                in_time: format(entry.in_time, "hh:mm:ss a  dd-MM-yyyy"),
                out_time: format(
                  outResponse.out_time,
                  "hh:mm:ss a  dd-MM-yyyy"
                ),
                status: "OUT",
                exist: true
              };
              await res.json(data);
            })
            .catch((err) => {
              console.log(`Erron in deleting In record ${err}`);
            });
        }
      }
      else if(responceObject && responceObject.status === false){
        console.log("reach")
        res.json({state: true});
      }
      else {
        console.log("No cord");
        res.json({ exist: false });
        //change after testing
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const allLog = async (req, res) => {
  console.log(`filter ${JSON.stringify(req.body)}`)
  const filterType = req.body.filterType;
const search = req.body.search;

let query = {};

if (filterType && search) {
  if(filterType!="programme"){
    query[filterType] = search;
  }
}

  const historicalData = await historicalModel.find(query);
  const currentData = await currentModel.find(query);
  const combinedData = [...historicalData, ...currentData];
  if(!req.body.sort || req.body.sort === -1){
    combinedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  else{
    const sortOrder = req.body.sort; // 1 for ascending, -1 for descending
    
    combinedData.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder * (dateA - dateB);
    });
  }
  let updatedData = await Promise.all(
    combinedData.map(async (entry) => {
      const student = await studentModel.findOne({ regNo: entry.regNo });
      return {
        ...entry._doc, // Spread the original entry
        programme: student ? student.programme : null, // Add the programme
        date: format(entry.createdAt, "dd-MM-yyyy"),
        in_time: entry.in_time
          ? format(new Date(entry.in_time), "hh:mm a")
          : "", // Format in_time
        out_time: entry.out_time
          ? format(new Date(entry.out_time), "hh:mm a")
          : "", // Format out_time
      };
    })
  );
  

  if (req.body.filterType === "programme") {
    updatedData = updatedData.filter(item => item.programme === req.body.search);
  }

    const startDate = req.body.startDate ? new Date(req.body.startDate) : new Date(-8640000000000000); // Very old date
    const endDate = req.body.endDate ? new Date(req.body.endDate) : new Date(); // Current date
    endDate.setDate(endDate.getDate() + 1); //adding 1 day to end date

  
    updatedData = updatedData.filter(item => {
      const createdAt = new Date(item.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });
  
  
  
  res.json(updatedData);
};

const totalLog = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to the start of the next day

    const curnt = await currentModel.countDocuments({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });
    const hist = await historicalModel.countDocuments({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const tot = curnt + hist;

    res.json({
      total: tot,
      current: curnt,
      history: hist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching total entries for today",
      error: error.message,
    });
  }
};


module.exports = { dashboardLog, activityLog, allLog, totalLog };
