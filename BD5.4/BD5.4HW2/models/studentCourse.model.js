let { DataTypes, sequelize } = require("../lib/index.js");
let { student } = require("./student.model.js");
let { course } = require("./course.model.js");

let studentCourse = sequelize.define("bookAuthors", {
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: student,
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: course,
      key: "id",
    },
  },
});

student.belongsToMany(course, { through: studentCourse });
course.belongsToMany(student, { through: studentCourse });
module.exports = { studentCourse };
