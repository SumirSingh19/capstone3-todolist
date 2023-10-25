import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

// Initialize an array to store tasks
const dailyTasks = [];
const workTasks = [];

app.get("/", (req, res) => {
  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  // Get the month as a string
  const monthString = months[currentDate.getMonth()];

  // Combine the month, day, and year into a formatted date
  const formattedDate = `${monthString} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    res.render("index.ejs", { tasks: dailyTasks, currentDate: formattedDate });
  });
  
  app.get("/work", (req, res) => {
    res.render("next.ejs", { tasks: workTasks });
  });

  app.post("/add-daily-task", (req, res) => {
    const taskName = req.body.newTask;
    const newTask = { id: dailyTasks.length, name: taskName };
    dailyTasks.push(newTask);
    res.redirect("/"); // Redirect to the daily tasks page
  });
  
  app.post("/add-work-task", (req, res) => {
    const taskName = req.body.newTask;
    const newTask = { id: workTasks.length, name: taskName };
    workTasks.push(newTask);
    res.redirect("/work"); // Redirect to the work-related tasks page
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
