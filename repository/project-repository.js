class ProjectRepository {
  constructor(context) {
    this.context = context;
  }

  createTable() {
    const sqlQuery = `CREATE TABLE IF NOT EXISTS Project 
            (Id INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT)`;
    return this.context.run(sqlQuery);
  }

  insert(name) {
    return this.context.run(`INSERT INTO Project (Name) VALUES (?)`, [name]);
  }
  update(project) {
    const { id, name } = project;
    return this.context.run(`UPDATE Project SET Name = ? WHERE Id = ?`, [
      name,
      id
    ]);
  }
  delete(id) {
    return this.context.run(`DELETE FROM Project WHERE Id = ?`, [id]);
  }

  getById(id) {
    return this.context.get(`SELECT * FROM Project WHERE Id = ?`, [id]);
  }

  getAll() {
    return this.context.all(`SELECT * FROM Project`);
  }
}

module.exports = ProjectRepository;
