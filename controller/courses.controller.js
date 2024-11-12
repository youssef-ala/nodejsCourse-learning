const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
  // get all courses from DB using Course Model
  const courses = await Course.find();

  res.json({
    status: httpStatusText.SUCCESS,
    data: {
      courses,
    },
  });
};

const getSingleCourse = async (req, res) => {
  // const courseId = +req.params.courseId;
  // const course = courses.find((course) => course.id === courseId);

  console.log("req.params.courseId", req.params.courseId);

  try {
    const course = await Course.findById(req.params.courseId);
    console.log("course ====", course);
    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "course not found" },
      });
    }

    return res.json({
      status: httpStatusText.SUCCESS,
      data: {
        course,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
      code: 400,
    });
  }
};

const createNewCourse = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: errors.array() });
  }

  console.log("errors", errors);

  // const course = { id: courses.length + 1, ...req.body };
  // courses.push(course);
  const newCourse = new Course(req.body);

  await newCourse.save();

  // res.status(201).json(courses);
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
};

const updateCourse = async (req, res) => {
  // const courseId = +req.params.courseId;
  // let course = courses.find((course) => course.id === courseId);
  const courseId = req.params.courseId;
  try {
    // const updatedCourse = await Course.findByIdAndUpdate(courseId, {
    //   $set: { ...req.body },
    // });
    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      {
        $set: { ...req.body },
      }
    );
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { course: updatedCourse },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: e.message });
  }

  // if (!course) {
  //   return res.status(404).json({ msg: "course not found" });
  // }
  // course = { ...course, ...req.body };

  res.status(200).json(updatedCourse);
};

const deleteCourse = async (req, res) => {
  // const courseId = +req.params.courseId;
  // courses = courses.filter((course) =>
  //   course.id !== courseId);

  const response = await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  createNewCourse,
  updateCourse,
  deleteCourse,
};
