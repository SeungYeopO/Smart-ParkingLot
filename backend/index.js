const express = require("express");

const pool = require("./DB.js");
const app = express();

const PORT = 3000;

app.get('/', (req, res)=>{
  res.send("GET request to homepage")
})

app.get("/users", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users");
    // console.log(data);
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/user_cars", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM user_cars");
    // console.log(data);
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/parking_managers", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM parking_managers");
    // console.log(data);
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/parking_lots", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM parking_lots");
    // console.log(data);
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/parking_sections", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM parking_sections");
    // console.log(data);
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//api 설계 후 작성하기(/api/~ 방식으로 수정)
// app.get("/parking_sections", async (req, res) => {
//   try {
//     const data = await pool.query("SELECT * FROM parking_sections");
//     // console.log(data);
//     return res.json(data[0]);
//   } catch (error) {
//     console.log(error);
//     return res.json(error);
//   }
// });

app.listen(PORT, () => console.log(`localhost:${PORT} 서버 기동중`));