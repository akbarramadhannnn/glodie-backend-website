const poolConnection = require("../config/connection");

exports.selectAllTeams = async () => {
  const sql = `SELECT * FROM teams`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.selectTeamsById = async (id) => {
  const sql = `SELECT * FROM teams WHERE teams_id = '${id}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};
