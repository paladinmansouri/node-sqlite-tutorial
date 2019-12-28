const Context = require("./context");
const ProjectRepository = require("../repository/project-repository");
const TaskRepository = require("../repository/task-repository");

const context = new Context("./database.sqlite3");
const projectRepo = new ProjectRepository(context);
const taskRepo = new TaskRepository(context);

const blogProjectData = { name: "First Project" };
let projectId;


module.exports.fillData = () => {    
  return new Promise((resolve, reject) => {
    projectRepo
      .insert(blogProjectData.name)
      .then(data => {
        projectId = data.id;
        const tasks = [
          {
            name: "First Task",
            description: "Start",
            isComplete: 1,
            projectId
          },
          {
            name: "Second Task",
            description: "End",
            isComplete: 0,
            projectId
          }
        ];
        return Promise.all(
          tasks.map(task => {
            const { name, description, isComplete, projectId } = task;
            return taskRepo.insert(name, description, isComplete, projectId);
          })
        );
      })
      .then(() => resolve("Fill Data is successed"))
      .catch(err => {
        reject(err);
      });
  });
};
