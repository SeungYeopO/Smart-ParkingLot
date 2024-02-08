const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

const pool = require("./DB.js");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("You need to request API");
});

// id 중복 체크 api
app.post("/api/user/users/id_check", async (req, res) => {
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
app.post("/api/user/users/sign_up", async (req, res) => {
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
app.post("/api/user/users/sign_in", async (req, res) => {
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
app.get("/api/user/lot_variable_data/:lot_id", async (req, res) => {
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
app.get("/api/user/check_floor", async (req, res) => {
  try {
    const currentFloor = -1;
    return res.json({ floor: currentFloor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//주차장 내 주차 칸 규격 확인
app.get("/api/user/section_scale/:lot_id", async (req, res) => {
  const lot_id = req.params.lot_id;
  const query = `
    SELECT type_id, width, height
    FROM parking_info.section_scales
    WHERE lot_id = ?
  `;
  try {
    const results = await pool.query(query, [lot_id]);
    console.log(results[0]);
    return res.json(results[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// 주차장 층별 주차 칸 확인
app.get("/api/user/parking_sections/:lot_id/:floor", async (req, res) => {
  const lot_id = req.params.lot_id;
  const floor = req.params.floor;
  try {
    const query = `
      SELECT ps.data_id, ps.type_id, ps.pos_x, ps.pos_y, ps.angle
      FROM parking_info.parking_sections ps
      JOIN parking_info.lot_floor_data lfd ON ps.data_id = lfd.data_id
      WHERE lfd.lot_id = ? AND lfd.floor = ?;
    `;
    const result = await pool.query(query, [lot_id, floor]);
    return res.json(result[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

// 주차 칸 상태 확인
app.get("/api/user/section_states/:lot_id/:floor", async (req, res) => {
  const lot_id = req.params.lot_id;
  const floor = req.params.floor;
  try {
    const query = `
      SELECT sst.data_id, sst.is_filled, sst.is_managed
      FROM parking_info.section_states sst
      JOIN parking_info.lot_floor_data lfd ON sst.data_id = lfd.data_id
      WHERE lfd.lot_id = ? AND lfd.floor = ?
    `;
    const data = await pool.query(query, [lot_id, floor]);
    const result = [];
    data[0].forEach((element) => {
      if (element.is_filled === 0 && element.is_managed === 0) {
        result.push({ data_id: element.data_id, is_filled: 0 });
      } else {
        result.push({ data_id: element.data_id, is_filled: 1 });
      }
    });
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//주차장 층별 도로 지점 확인
app.get("/api/user/cross_points/:lot_id/:floor", async (req, res) => {
  const lot_id = req.params.lot_id;
  const floor = req.params.floor;
  try {
    const query = `
      SELECT cp.data_id, cp.pos_x, cp.pos_y
      FROM parking_info.cross_points cp
      JOIN parking_info.lot_floor_data lfd ON cp.data_id = lfd.data_id
      WHERE lfd.lot_id = ? AND lfd.floor = ?;
    `;
    const result = await pool.query(query, [lot_id, floor]);
    return res.json(result[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//추천 주차 칸 확인
app.get("/api/user/recommand_section/:lot_id", async (req, res) => {
  const lot_id = req.params.lot_id;
  const query = `
    SELECT data_id,
  `;
});

//안내된 주차 칸 까지의 경로 확인
app.get("/api/user/short_path/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const query1 = `
  SELECT cp.point_num, ec.lot_id
  FROM car_positions cp 
  JOIN entry_cars ec ON ec.entry_car_id = cp.entry_car_id
  WHERE ec.user_id = ?;
  `;
  const data1 = await pool.query(query1, [user_id]);

  const query2 = `
  SELECT entry_exit, is_wide
  FROM lot_personal_presets
  WHERE lot_id = ?;
  `;
  const lot_id = data1[0][0].lot_id;
  const data2 = await pool.query(query2, [lot_id]);

  const entry_exit = data2[0][0].entry_exit;
  const is_wide = data2[0][0].is_wide;

  let query3;

  if (entry_exit === 0) {
    query3 = `
    SELECT pos_x, pos_y
    FROM building_entry_points
    WHERE lot_id = ? AND floor = -1
    `;
  } else if (entry_exit === 1) {
    query3 = `
    SELECT pos_x, pos_y
    FROM car_exit_points
    WHERE lot_id = ? AND floor = -1
    `;
  }
  const data3 = await pool.query(query3, [lot_id]);
  const entry_exit_x = data3[0][0].pos_x;
  const entry_exit_y = data3[0][0].pos_y;

  const query4 = `
  SELECT ps.data_id, ps.pos_x, ps.pos_y
  FROM parking_sections ps
  JOIN section_states ss ON ps.data_id = ss.data_id
  JOIN lot_floor_data lfd ON ps.data_id = lfd.data_id
  WHERE lfd.lot_id = ?
  AND lfd.floor = -1
  AND ss.is_filled = 0
  AND ss.is_managed = 0;
`;
  let min_distance = 2e9;
  let min_pos_x;
  let min_pos_y;
  let min_point_num;
  const data4 = await pool.query(query4, [lot_id]);
  data4[0].forEach((element) => {
    let distance = Math.sqrt(
      (element.pos_x - entry_exit_x) ** 2 + (element.pos_y - entry_exit_y) ** 2
    );
    if (distance < min_distance) {
      min_distance = distance;
      min_point_num = element.data_id;
      //min_pos_x = element.pos_x;
      //min_pos_y = element.pos_y;
    }
  });
  const end = min_point_num;
  const results = [];

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

      fs.readFile("./map_data/short_path.json", "utf8", async (err, data) => {
        if (err) {
          console.error("Error reading JSON file:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        try {
          const short_path = JSON.parse(data);
          for (const element of short_path) {
            const query = `
              SELECT pos_x, pos_y
              FROM cross_points
              WHERE data_id = ?
            `;
            const result = await pool.query(query, [element]);
            if (result[0][0] !== undefined) {
              results.push({
                point_num: element,
                pos_x: result[0][0].pos_x,
                pos_y: result[0][0].pos_y,
              });
            }
          }
          return res.json(results);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      });
    }
  );
});

// 도움 요청 및 문의 업로드
app.post("/api/user/user_inquiries", async (req, res) => {
  const user_id = req.body.user_id;
  const lot_id = req.body.lot_id;
  const user_inquiry = req.body.user_inquiry;

  try {
    const insertQuery = `
      INSERT INTO user_inquiries (user_id, lot_id, inquiry)
      VALUES (?, ?, ?)
    `;
    await pool.query(insertQuery, [user_id, lot_id, user_inquiry]);

    const selectQuery = `
      SELECT LAST_INSERT_ID() AS inquiry_id
    `;
    const result = await pool.query(selectQuery);

    const inquiry_id = result[0].inquiry_id;

    return res.json({ user_id: user_id, inquiry_id: inquiry_id, result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
});

//가장 최근에 저장된 CCTV 데이터를 가져오는 쿼리
app.get("/api/p_manager/get_latest_cctv_data", async (req, res) => {
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

//주차장 관리자 로그인 api
app.post("/api/p_manager/managers/sign_in", async (req, res) => {
  const admin_password = req.body.admin_password;
  const lot_token = req.body.lot_token;
  try {
    const query = `
      SELECT lot_id
      FROM managers
      WHERE password = ? AND lot_token = ?; 
    `;

    const result = await pool.query(query, [admin_password], [lot_token]);

    if (result.length > 0) {
      const lot_id = result[0].lot_id;
      return res.json({ lot_id: lot_id, result: true });
    } else {
      return res.json({ lot_id: null, result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//관리 중인 주차장 확인
//포인트 번호, 해당 포인트가 존재하는 층, 포인트 타입이 전송된다
app.get("/api/p_manager/lot_floor_data/:lot_id", async (req, res) => {
  const lot_id = req.params.lot_id;

  try {
    const query = `

    `;
  } catch (error) {}
});

//관리 중인 주차장 층별 맵 확인
app.get("/api/p_manager/parking_sections/:lot_id/:floor", async (req, res) => {
  const lot_id = req.params.lot_id;
  const floor = req.params.floor;
  try {
    const query = `
      SELECT ps.data_id, ps.type_id, ps.pos_x, ps.pos_y, ps.angle
      FROM parking_info.parking_sections ps
      JOIN parking_info.lot_floor_data lfd ON ps.data_id = lfd.data_id
      WHERE lfd.lot_id = ? AND lfd.floor = ?;
    `;
    const result = await pool.query(query, [lot_id, floor]);
    return res.json(result[0]);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//관리 중인 주차장의 층별 주차칸 상태 확인
app.get("/api/p_manager/section_stats/:lot_id/:floor", async (req, res) => {
  const lot_id = req.params.lot_id;
  const floor = req.params.floor;
  const query = `
    SELECT sst.data_id, sst.is_filled, sst.user_id, sst.is_managed
    FROM parking_info.section_states sst
    JOIN parking_info.lot_floor_data lfd ON sst.data_id = lfd.data_id
    WHERE lfd.lot_id = ? AND lfd.floor = ?
  `;
  try {
    const results = await pool.query(query, [lot_id, floor]);
    if (results.length > 0) {
      return res.json(results[0]);
    } else {
      res.status(404).json({ error: "No section_states DATA found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// 관리자가 해당 자리의 is_managed 상태를 바꾸는 api
app.patch("/api/p_manager/section_states", async (req, res) => {
  const data_id = req.body.data_id;
  const is_managed = req.body.is_managed;

  try {
    const query = `
      UPDATE section_states SET is_managed = ? 
      WHERE data_id = ?
    `;
    const result = await pool.query(query, [is_managed, data_id]);

    if (result.changedRows > 0) {
      // 최소한 한 행은 찾아져서 변경됨.
      return res.json({ result: true });
    } else if (result.affectedRows === 0) {
      // WHERE 절에 맞는 행이 없음.
      return res.status(404).json({
        error: "업데이트할 행을 찾을 수 없습니다",
      });
    } else {
      // 변경된 내용이 없음 (기존 값과 동일).
      return res.json({ result: true, message: "변경 사항이 없습니다" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/user/car_position_x_y", async (req, res) => {
  try {
    const query = `
    SELECT cr.pos_x, cr.pos_y
    FROM car_positions cp
    JOIN cross_points cr ON cp.point_num = cr.data_id
    WHERE cp.entry_car_id = 1;
`;
    const result = await pool.query(query);
    console.log(result[0]);
    if (result.length > 0) {
      return res.json(result[0]);
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

// 주차장 관리 기본 프리셋 불러오기
app.get("/api/p_manager/lot_base_presets", async (req, res) => {
  try {
    const query = `
    SELECT *
    FROM lot_base_presets;
`;
    const result = await pool.query(query);
    if (result.length > 0) {
      return res.json(result[0]);
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

// 주차장 관리 개인 프리셋 불러오기
app.get("/api/p_manager/lot_personal_presets/:lot_id", async (req, res) => {
  const lot_id = req.params.lot_id;

  try {
    const query = `
    SELECT *
    FROM lot_personal_presets
    WHERE lot_id = ?
`;
    const result = await pool.query(query, [lot_id]);
    if (result.length > 0) {
      return res.json(result[0]);
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

// 주차장 관리 프리셋 저장
app.patch("/api/p_manager/lot_personal_presets", async (req, res) => {
  const lot_id = req.body.lot_id;
  const congestion = req.body.congestion;
  const entry_exit = req.body.entry_exit;
  const is_wide = req.body.is_wide;
  const penalty_limit = req.body.penalty_limit;

  try {
    const query = `
      UPDATE lot_personal_presets 
      SET congestion = ?, entry_exit = ?, is_wide = ?, penalty_limit = ?
      WHERE lot_id = ?
    `;
    const result = await pool.query(query, [
      congestion,
      entry_exit,
      is_wide,
      penalty_limit,
      lot_id,
    ]);
    console.log(result);
    if (result.changedRows > 0) {
      return res.json({ result: true });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "업데이트할 행을 찾을 수 없습니다",
      });
    } else {
      // 변경된 내용이 없음 (기존 값과 동일).
      return res.json({ result: true, message: "변경 사항이 없습니다" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/update_RF", async (req, res) => {});
app.listen(PORT, () => console.log(`서버 기동중`));
