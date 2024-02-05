const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

const pool = require("./DB.js");
const app = express();
const PORT = 3001;

// function carToSection(start, end) {
//   exec(`cd ./map_data
// 	g++ -o root_finder ./mapalgorithm.cpp
// 	./root_finder ${start} ${end}`, (error, stdout, stderr) => {
//     if(error) {
//       console.error(error);
//       return;
//     }
//     if(stderr){
//       console.error(stderr);
//       return;
//     }
//     console.log(stdout);
//   })
// }

//carToSection();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("You need to request API");
});

// id 중복 체크 api
app.post("/api/users/id_check", async (req, res) => {
  const loginId = req.body.login_id;
  try {
    const query = `SELECT * FROM users WHERE login_id = '${loginId}'`;
    const results = await pool.query(query);
    if (results.length > 0) {
      return res.json({ result: false });
    } else {
      return res.json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// 회원 등록 api
app.post("/api/users/sign_up", async (req, res) => {
  const loginId = req.body.login_id;
  const password = req.body.password;
  const carNumber = req.body.car_number;
  const cartype = req.body.car_type;
  const isElectricCar = req.body.is_electric_car;
  const isImpairedCar = req.body.is_impared_car;

  try {
    const query = `
        INSERT INTO users (login_id, password, car_number, car_type, is_electric_car, is_impared_car)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    await pool.query(query, [
      loginId,
      password,
      carNumber,
      cartype,
      isElectricCar,
      isImpairedCar,
    ]);
    return res.json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ result: false });
  }
});

// 회원 로그인 api
app.post("/api/users/sign_in", async (req, res) => {
  const loginId = req.body.login_id;
  const password = req.body.password;

  try {
    const query = `
          SELECT user_id FROM users
          WHERE login_id = ? AND password = ?
        `;

    const result = await pool.query(query, [loginId, password]);

    if (result.length > 0) {
      const user_id = result[0].user_id;
      return res.json({ user_id: user_id, result: true });
    } else {
      return res.json({ user_id: null, result: false });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
});

// 목적지 주차장 전체 현황 확인
app.get("/api/lot_variable_data/:lot_id", async (req, res) => {
  const lotId = req.params.lot_id;

  try {
    const query = `
        SELECT floor, floor_sections, available_sections, now_entries
        FROM lot_variable_data
        WHERE lot_id = ?
      `;
    const result = await pool.query(query, [lotId]);
    if (result.length > 0) {
      const { floor, floor_sections, available_sections, now_entries } =
        result[0];
      return res.json({
        floor,
        floor_sections,
        available_sections,
        now_entries,
      });
    } else {
      return res.status(404).json({
        error: "Parking information not found for the specified lot_id",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// 주차장 내 현재 위치한 층 확인 api
app.get("/api/check_floor", async (req, res) => {
  try {
    const currentFloor = 1;
    return res.json({ floor: currentFloor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
      WHERE lfd.lot_id = ? AND lfd.floor = ?;`,
      [lot_id, floor]
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
      WHERE lfd.lot_id = ? AND lfd.floor = ?;`,
      [lot_id, floor]
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

  await exec(
    `cd ./map_data
	g++ -o root_finder ./mapalgorithm.cpp
	./root_finder ${start} ${end}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        return;
      }
      if (stderr) {
        console.error(stderr);
        return;
      }

      fs.readFile(
        "/home/ubuntu/S10P12C102/backend/map_data/short_path.json",
        "utf8",
        (err, data) => {
          if (err) {
            console.error("Error reading JSON file:", err);
            return;
          }

          const short_path = JSON.parse(data);
          console.log(short_path);
          return res.json(short_path);
        }
      );
    }
  );
});

app.get("/api/get_latest_cctv_data", async (req, res) => {
  try {
    // 가장 최근에 저장된 CCTV 데이터를 가져오는 쿼리
    const selectQuery = "SELECT cctv_json FROM cctv ORDER BY id DESC LIMIT 1";

    // mysql2/promise를 사용하여 비동기 쿼리 수행
    const [results] = await pool.query(selectQuery);
    console.log(results);
    if (results.length > 0) {
      const latestCctvData = results[0].cctv_json;
      res.json({ cctv_json: latestCctvData });
    } else {
      res.status(404).json({ error: "No CCTV data found" });
    }
  } catch (error) {
    console.error("CCTV 데이터 가져오기 오류:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`서버 기동중`));
