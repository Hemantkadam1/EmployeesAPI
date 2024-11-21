const express = require("express");
let { sequelize } = require("./lib/index.js");
let { student } = require("./models/student.model.js");
let { course } = require("./models/course.model.js");

const app = express();
app.use(express.json());

const courses = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];

const students = [
  { name: "John Doe", age: 24 },
  { name: "Guru", age: 25 },
  { name: "Hemanth", age: 26 },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await student.bulkCreate(students);
    await course.bulkCreate(courses);
    res.status(200).json({ message: "Database seeding sucessful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 1: Create New Student
async function addNewStudent(newStudentData) {
  let newStudent = await student.create(newStudentData);
  return { message: "New student data created sucessfully", newStudent };
}
app.post("/students/new", async (req, res) => {
  try {
    let newStudent = req.body.newStudent;
    let result = await addNewStudent(newStudent);
    if (!result.message) {
      return res
        .status(404)
        .json({ message: "Errror in creating a new student record" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Update Student by ID
async function updateStudentById(newStudentData, id) {
  let studentData = await student.findOne({ where: { id } });
  if (!studentData) {
    return {};
  }
  studentData.set(newStudentData);
  let updatedStudent = await studentData.save();
  return { message: " Student updated Successfully", updatedStudent };
}
app.post("/students/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newStudentData = req.body;
    let result = await updateStudentById(newStudentData, id);
    if (!result.message) {
      return res
        .status(404)
        .json({ message: "Errror in updating student record" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
