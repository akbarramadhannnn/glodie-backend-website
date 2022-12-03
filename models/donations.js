const poolConnection = require("../config/connection");

exports.selectAllDonations = async () => {
  const sql = `SELECT * FROM donations`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.selectDonationsById = async (id) => {
  const sql = `SELECT * FROM donations WHERE donations_id = '${id}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};
