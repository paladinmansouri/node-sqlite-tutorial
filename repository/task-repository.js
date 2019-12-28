class TaskRepository {
  constructor(context) {
    this.context = context;
  }

  createTable() {
    const sqlQuery = `
        CREATE TABLE IF NOT EXISTS Task (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT,
          Description TEXT,
          IsComplete INTEGER DEFAULT 0,
          ProjectId INTEGER,
          CONSTRAINT Task_fk_ProjectId FOREIGN KEY (ProjectId)
            REFERENCES Project(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
    return this.context.run(sqlQuery);
  }

  insert(name, description, isComplete, projectId) {
    return this.context.run(
      `INSERT INTO Task (Name, Description, IsComplete, ProjectId)
        VALUES (?, ?, ?, ?)`,
      [name, description, isComplete, projectId]
    );
  }

  update(task) {
    const { id, name, description, isComplete, projectId } = task;
    return this.context.run(
      `UPDATE Task
      SET name = ?,
        Description = ?,
        IsComplete = ?,
        ProjectId = ?
      WHERE Id = ?`,
      [name, description, isComplete, projectId, id]
    );
  }
  delete(id) {
    return this.context.run(`DELETE FROM Task WHERE Id = ?`, [id]);
  }

  getById(id) {
    return this.context.get(`SELECT * FROM Task WHERE Id = ?`, [id]);
  }

  getByProjectId(projectId) {
    return this.context.all(`SELECT * FROM Task WHERE ProjectId = ?`, projectId);
  }

  getAll() {
    return this.context.all('SELECT * FROM Task');
  }
}

module.exports = TaskRepository;
