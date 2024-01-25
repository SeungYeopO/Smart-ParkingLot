const express = require("express");

const pool = require("./DB.js");
const app = express();

const PORT = 3000;

app.use(express.json())

app.get('/', (req, res)=>{
  res.send("You need to request API")
})

app.get('/api', (req, res)=>{
  res.send(`
    You need to request API detail
    API list
      /api/user : API for user
      /api/manager : API for manager
      /api/admin : API for administator
  `)
})

//사용자와 직접 연관되는 API 명세
app.get('/api/user/parking_sections', async (req, res)=>{
  try {
    const data = await pool.query("SELECT * FROM parking_sections");
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
})

//관리자가 사용하게 되는 API 명세
app.get("/api/users", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users");
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/api/user_cars", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM user_cars");
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