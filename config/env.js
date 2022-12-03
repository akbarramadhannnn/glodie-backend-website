const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  base_url:
    NODE_ENV === "local" ? "http://localhost:2032" : "http://localhost:3032",
  base_url_admin:
    NODE_ENV === "local"
      ? "http://localhost:2022"
      : "https://api-adminpanel.alglodieloggy.com",
  server: {
    port: NODE_ENV === "local" ? 2032 : 3032,
  },
  mysql: {
    host: NODE_ENV === "local" ? "localhost" : "103.181.183.117",
    port: 3306,
    user: NODE_ENV === "local" ? "root" : "pitik",
    password: NODE_ENV === "local" ? "123pitik" : "123pitik",
    database: NODE_ENV === "local" ? "dev_glodie" : "prod_glodie",
  },
};
