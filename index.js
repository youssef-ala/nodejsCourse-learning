const express = require("express");

const app = express();


const mongoose = require('mongoose')

const uri =
"mongodb+srv://yousefalaa202:Elden%40161995@learn-mongodb.ayua2yy.mongodb.net/yousefdev?retryWrites=true&w=majority&appName=learn-mongodb";
mongoose.connect(uri).then(() => {
  console.log('mongodb server start');
})

const port = 3000;
app.use(express.json());
const coursesRouter = require("./routes/courses.route");

app.use("/api/courses", coursesRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// create course
// app.post("/api/courses", query("title", "price").notEmpty(), (req, res) => {
//   console.log(req.body);

//   courses.push({ id: courses.length + 1, ...req.body });

//   res.status(201).json(courses);
// });

