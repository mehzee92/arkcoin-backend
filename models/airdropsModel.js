const pool = require('../config/db');

module.exports = {

  async getAirdrops(query) {
      const page = query.page || 0; 
      const perPage = 20;
      const startAt = page * perPage;
      let conditions = "";
      let params = [];

      if (query && query.q) {
        conditions += " AND (name LIKE ? OR email LIKE ?)";
        params.push(`%${query.q}%`, `%${query.q}%`);
      }

      const sql = `SELECT * FROM airdrops WHERE 1=1 AND amount>0 ${conditions} ORDER BY id DESC LIMIT ?, ?`;
      params.push(startAt, perPage);

      const [rows] = await pool.query(sql, params);
      return rows;
  },



  async getAirdropRequests(query) {
      const page = query.page || 0; 
      const perPage = 20;
      const startAt = page * perPage;
      let conditions = "";
      let params = [];

      if (query && query.q) {
        conditions += " AND (name LIKE ? OR email LIKE ?)";
        params.push(`%${query.q}%`, `%${query.q}%`);
      }

      const sql = `SELECT * FROM airdrops WHERE 1=1 AND amount=0 ${conditions} ORDER BY id DESC LIMIT ?, ?`;
      params.push(startAt, perPage);

      const [rows] = await pool.query(sql, params);
      return rows;
  },
  
  

  async getLatestAirdrops(query) 
  {
      const page = query.page || 0;
      const perPage = 6;
      const startAt = page * perPage;
      let conditions = "";
      let params = [];

      if (query && query.q) {
        conditions += " AND (name LIKE ? OR email LIKE ?)";
        params.push(`%${query.q}%`, `%${query.q}%`);
      }

      const sql = `SELECT * FROM airdrops WHERE 1=1 ${conditions} ORDER BY id DESC LIMIT ?, ?`;
      params.push(startAt, perPage);

      const [rows] = await pool.query(sql, params);
      return rows;
  },




async getAirdropById(id) {
  const [rows] = await pool.query("SELECT * FROM airdrops WHERE id = ?", [id]);
  return rows[0];
},



async createAirdrop(data) 
{
    const fields = ` name, email, wallet, telegram, amount `;
    const values = [
      data.name,
      data.email,
      data.wallet,
      data.telegram,
      0
    ];
    const placeholders = values.map(() => '?').join(', ');
    const sql = `INSERT INTO airdrops (${fields}) VALUES (${placeholders})`;
    const [result] = await pool.query(sql, values);
    return result.insertId;
},



  async addUpAirdrop(data) 
  {
      const values = [data.amount, data.wallet];
      const sql = `UPDATE airdrops SET amount = amount + ? WHERE wallet = ?`;
      const [result] = await pool.query(sql, values);
      if (result.affectedRows === 0) {
        return { success: false, message: "Wallet not found" };
      }
      return { success: true, affectedRows: result.affectedRows };
  },

  async update(rows) 
  {
      rows.map(async(row)=>{
        try 
        {
            const values = [row.amount, row.wallet]
            const sql = `UPDATE airdrops SET amount = ? WHERE wallet = ?`;
            const [result] = await pool.query(sql, values);
        } catch(err) {
            console.log(error);
        }
      })
  }


};
