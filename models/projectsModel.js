const pool = require('../config/db');

module.exports = {

  async getProjects(query) {
    const page = query.page || 0;
    const perPage = 20;
    const startAt = page * perPage;
    let conditions = "";
    let params = [];

    if (query && query.q) {
      conditions += " AND (project_name LIKE ? OR description LIKE ? OR sender_name LIKE ? OR sender_email LIKE ?)";
      params.push(`%${query.q}%`, `%${query.q}%`, `%${query.q}%`, `%${query.q}%`);
    }

    const sql = `SELECT * FROM projects WHERE 1=1 ${conditions} ORDER BY id DESC LIMIT ?, ?`;
    params.push(startAt, perPage);

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  // Get latest projects (for home / recent view)
  async getLatestProjects(query) {
    const page = query.page || 0;
    const perPage = 6;
    const startAt = page * perPage;
    let conditions = "";
    let params = [];

    if (query && query.q) {
      conditions += " AND (project_name LIKE ? OR description LIKE ? OR sender_name LIKE ? OR sender_email LIKE ?)";
      params.push(`%${query.q}%`, `%${query.q}%`, `%${query.q}%`, `%${query.q}%`);
    }

    const sql = `SELECT * FROM projects WHERE 1=1 ${conditions} ORDER BY id DESC LIMIT ?, ?`;
    params.push(startAt, perPage);

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  // Get single project by ID
  async getProjectById(id) {
    const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
    return rows[0];
  },

  // Create new project
  async createProject(data) {

    const fields = `
      project_name, description, project_type, 
      cert_gold, cert_verra, cert_other, certified, 
      sender_name, sender_email, telegrams
    `;
    const values = [
      data.project_name,
      data.description,
      data.project_type,
      data.cert_gold || 0,
      data.cert_verra || 0,
      data.cert_other || "",
      data.certified || 0,
      data.sender_name,
      data.sender_email,
      data.telegrams
    ];

    try {
      const placeholders = values.map(() => '?').join(', ');
      console.log(placeholders);
      console.log(values);
      console.log(fields);
      const sql = `INSERT INTO projects (${fields}) VALUES (${placeholders})`;
      const [result] = await pool.query(sql, values);
      return result;
    } 
    catch(err) 
    {
      return err;
    }
  }

};
