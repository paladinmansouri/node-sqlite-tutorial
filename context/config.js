const Context = require("./context");
const ProjectRepository = require("../repository/project-repository");
const TaskRepository = require("../repository/task-repository");

const context = new Context("./database.sqlite3");
const projectRepo = new ProjectRepository(context);
const taskRepo = new TaskRepository(context);

module.exports.createTable = () => {
  return new Promise((resolve, reject) => {
    projectRepo
      .createTable()
      .then(() => taskRepo.createTable())
      .then(() => resolve("Create Table"))
      .catch(err => reject("Create Table Error" + err));
  });
};
