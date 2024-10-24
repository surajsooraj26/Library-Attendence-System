const studentModel = require("../models/student");
const multer = require("multer");
const path = require("path");

const allStudents = async (req, res) => {
  try {
    const data = await studentModel.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const addStudent = async (req, res) => {
  // Set up storage engine
  const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  // Init upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  }).single("image");

  // Check file type
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ msg: "No file selected" });
      } else {
        //scope out of limit
        if(req.body.programme){
          const student = new studentModel({
            profile: `/uploads/${req.file.filename}`,
            regNo: req.body.regNo,
            name: req.body.name,
            role: req.body.role,
            programme: req.body.programme,
            duration: {
              start: req.body.duration.start,
              end: req.body.duration.end,
            },
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address
          });
          try {
            await student.save();
            res.status(201).json(student);
          } catch (err) {
            res.status(500).json({ error: "Server error" });
          }
        }else{
          const student = new studentModel({
            profile: `/uploads/${req.file.filename}`,
            regNo: req.body.regNo,
            name: req.body.name,
            role: req.body.role,
            programme:"Faculity",
            duration: {
              start: req.body.duration.start,
              end: req.body.duration.end,
            },
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address
          });
          try {
            await student.save();
            res.status(201).json(student);
          } catch (err) {
            res.status(500).json({ error: "Server error" });
          }
        }


      }
    }
  });
};

const updateUser = async (req, res) => {
  try {
    const { regNo, name, programme, duration, gender, phone, address } = req.body;

    // Find the student by registration number and update their details
    const updatedStudent = await studentModel.findOneAndUpdate(
      { regNo }, // Find by regNo
      {
        $set: {
          name,
          programme,
          duration,
          gender,
          phone,
          address,
        },
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', updatedStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const disableUser = async (req, res) => {
  try {
    const { regNo } = req.body;

    // Find the student by regNo
    const student = await studentModel.findOne({ regNo: regNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Toggle the 'status' field
    const newStatus = student.status === false ? true : false;

    // Update the student's 'status' field
    const updatedStudent = await studentModel.findOneAndUpdate(
      { regNo: regNo },                // Find the student by regNo
      { $set: { status: newStatus } },  // Toggle 'status'
      { new: true }                     // Return the updated document
    );

    res.status(200).json({ message: `Status updated to ${newStatus}`, updatedStudent });
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const regNo = req.params.regNo;

    // Find the student by regNo and delete the record
    const deletedStudent = await studentModel.findOneAndDelete({ regNo: regNo });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
}

module.exports = { allStudents, addStudent, updateUser, deleteUser, disableUser };
