const express = require("express");
const cors = require("cors");

const pool = require("./DB.js");
const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("You need to request API");
});

app.get("/api", (req, res) => {
  res.send(`
    You need to request API detail
  `);
});

//사용자와 직접 연관되는 API 명세
app.get("/api/parking_sections/:lot_id", async (req, res) => {
  const lot_id = req.params.lot_id;
  try {
    const data = await pool.query(
      `SELECT * FROM parking_sections WHERE lot_id = ${lot_id}`
    );
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.listen(PORT, () => console.log(`서버 기동중`));
