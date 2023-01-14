const mongoose = require("mongoose");
const Task = require("./taskModel");
const User = require("./usersModel");

mongoose.connect(process.env.MONGODB_URL);

const populateUser = async () => {
  const task = await Task.findById("63b426d0026b40b509937b9c");

  //const user = await Task.findById(task.user);

  await task.populate("user"); // gets the referenced user
  console.log(task.user);
};

const populateTask = async () => {
  const user = await User.findById("63b41c0c6497539ac2cd8997");
  await user.populate("tasks"); //virtual function created in userSchema (user.tasks)
  console.log(user.tasks);
};

populateTask();
//populateUser();
