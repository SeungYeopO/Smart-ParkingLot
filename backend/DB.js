const mysql = require("mysql2/promise");

const dbConfig = {
  host: "stg-yswa-kr-practice-db-master.mariadb.database.azure.com",
  port: 3306,
  user: "S10P12C102@stg-yswa-kr-practice-db-master.mariadb.database.azure.com",
  password: "oOsiCWwmDO",
  database: "s10p12c102",
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;