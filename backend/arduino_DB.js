const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = {
  host: "3.38.208.90",
  user: "snowman",
  password: "snowman",
  database: "parking_info",
};

const pool = mysql.createPool(dbConfig);

app.get("/", (req, res) => {
  res.send("서버가 실행 중입니다.");
});

app.get("/updateDatabase", async (req, res) => {
  const newText = req.query.text;

  if (newText) {
    try {
      const connection = await pool.getConnection();

      // Get current date and time
      const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

      // Insert new data into the database
      const insertQuery = `
          INSERT INTO parking_info.RF_data (signal_index, data_input_time)
          VALUES (?, ?)
        `;

      await connection.query(insertQuery, [newText, currentDateTime]);

      connection.release();

      console.log("데이터베이스 값이 삽입되었습니다.");
      res.send("데이터베이스 삽입 완료");
    } catch (error) {
      console.error("데이터베이스 삽입 중 오류:", error);
      res.status(500).send("데이터베이스 삽입 오류");
    }
  } else {
    res.status(400).send("유효하지 않은 값");
  }
});

app.listen(PORT, () => console.log(`서버 기동중`));
