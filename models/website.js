const poolConnection = require("../config/connection");

exports.selectWebsiteByMenuName = async (menu) => {
  const sql = `SELECT * FROM website_content WHERE menu_name = '${menu}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};
