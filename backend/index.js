const express = require("express");
const cors = require("cors");
const {exec} = require("child_process");
const fs = require("fs");

const pool = require("./DB.js");

const app = express();

const PORT = 3001;

function carToSection(start, end) {
  exec(`g++ -o root_finder ./map_data/mapalgorithm.cpp && ./map_data/root_finder ${start} ${end}`, (error, stdout, stderr) => {
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

//carToSection();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("You need to request API");
});

//주차장 id와 해당 층에 해당하는 주차 칸 정보
app.get("/api/parking_sections/:lot_id/:floor", async (req, res) => {
  const lot_id = req.params.lot_id;
  const floor = req.params.floor;
  try {
    const data = await pool.query(
      `SELECT ps.data_id, ps.type_id, ps.pos_x, ps.pos_y, ps.angle
      FROM parking_info.parking_sections ps
      JOIN parking_info.lot_floor_data lfd ON ps.data_id = lfd.data_id
      WHERE lfd.lot_id = ? AND lfd.floor = ?;`, [lot_id, floor]
    );
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//주차장 id와 해당 층에 있는 도로 지점 정보
app.get("/api/cross_points/:lot_id/:floor", async (req, res) => {
  const lot_id = req.params.lot_id;
  const floor = req.params.floor;
  try {
    const data = await pool.query(
      `SELECT cp.data_id, cp.pos_x, cp.pos_y
      FROM parking_info.cross_points cp
      JOIN parking_info.lot_floor_data lfd ON cp.data_id = lfd.data_id
      WHERE lfd.lot_id = ? AND lfd.floor = ?;`,[lot_id, floor]
    );
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/api/short_path/:lot_id/:floor/:start/:end", async (req, res) => {
  const lot_id = req.params.lot_id;
  const floor = req.params.floor;
  const start = req.params.start;
  const end = req.params.end;
  try {
    const short_path = null;
    carToSection(start, end);
    fs.readFile('./short_path.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return;
      }
    
      short_path = JSON.parse(data);
      console.log(short_path);
    });
    return res.json(short_path);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
})

app.listen(PORT, () => console.log(`서버 기동중`));