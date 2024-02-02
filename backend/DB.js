const mysql = require("mysql2/promise");

const dbConfig = {
  host: "i10c102.p.ssafy.io",
  port: 3306,
  user: "snowman",
  password: "snowman",
  database: "parking_info",
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;