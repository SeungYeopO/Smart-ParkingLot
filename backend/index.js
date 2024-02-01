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


/*
const express = require("express");
const {exec} = require("child_process");
const pool = require("./DB.js");
const mapLibrary = require("./mapLibrary.js");

const app = express();

const PORT = 3000;

function carToSection() {
  exec('g++ -o root_finder ./map_data/mapalgorithm.cpp && ./map_data/root_finder', (error, stdout, stderr) => {
    if(error) {
      console.error(error);
      return;
    }
    if(stderr){
      console.error(stderr);
      return;
    }
    console.log(stdout);
  })
}
carToSection();

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
*/