const poolConnection = require("../config/connection");

exports.selectAllCollections = async () => {
  const sql = `SELECT * FROM collections`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.selectCollectionsById = async (id) => {
  const sql = `SELECT * FROM collections WHERE collections_id = '${id}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};
