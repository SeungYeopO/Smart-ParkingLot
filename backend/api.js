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
  const isLightCar = req.body.is_light_car;
  const isElectricCar = req.body.is_electric_car;
  const isImpairedCar = req.body.is_impared_car;

  try {
    const query = `
        INSERT INTO users (login_id, password, car_number, is_light_car, is_electric_car, is_impared_car)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    await pool.query(query, [
      loginId,
      password,
      carNumber,
      isLightCar,
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

// 목적지 주차장 층별 현황 확인
app.get("/api/lot_variable_data/:lot_id/:floor", async (req, res) => {
  const lotId = req.params.lot_id;
  const floor = req.params.floor;

  try {
    const query = `
        SELECT floor, floor_sections, available_sections, now_entries
        FROM lot_variable_data
        WHERE lot_id = ? AND floor = ?
      `;
    const result = await pool.query(query, [lotId], [floor]);
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
      let total_available_sections = 0;
      let total_entries = 0;
      for (let i = 0; i < result.length; i++) {
        total_available_sections += result[0][i].available_sections;
        total_entries += result[0][i].now_entries;
      }
      return res.json({
        total_available_sections: total_available_sections,
        total_entries: total_entries,
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

// 주차장 내 주차 칸 규격 확인
app.get("/api/section_scales/:lot_id", async (req, res) => {
  const lotId = req.params.lot_id;
  try {
    // 가장 최근에 저장된 주차 칸 규격 데이터를 가져오는 쿼리
    const selectQuery = `
      SELECT type_id, width, height
      FROM section_scales
      WHERE lot_id = ?`;

    const [results] = await pool.query(selectQuery, [lotId]);

    if (results.length > 0) {
      res.json(results);
    } else {
      res
        .status(404)
        .json({ error: "No section scales found for the specified lot_id" });
    }
  } catch (error) {
    console.error("주차 칸 규격 데이터 가져오기 오류:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 주차 경로 알려줄 수 있는 api 요청
let carcar = 1;
app.get("/api/asdasd", async (req, res) => {
  try {
    const query = `
    SELECT pos_x, pos_y FROM cross_points AS a INNER JOIN car_positions1 As b ON a.data_id = b.point_num WHERE b.entry_car_id = ?
      `;
    const result = await pool.query(query, [carcar]);
    console.log(result[0]);
    console.log(carcar);
    carcar++;
    if (carcar > 24) {
      carcar = 1;
    }

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

// 도움 요청 문의 내용 업로드 api
app.post("/api/users/user_inquiries", async (req, res) => {
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

// 여기까지 index.js에서 추가됨 //
////////////////////////////////

// 관리자가 해당 자리의 is_managed 상태를 바꾸는 api
app.patch("/api/section_states", async (req, res) => {
  const data_id = req.body.data_id;
  const is_managed = req.body.is_managed;

  const inverted_is_managed = ~is_managed & 1;
  try {
    const query = `
        UPDATE section_states SET is_managed = ? 
        WHERE data_id = ?
      `;
    const result = await pool.query(query, [inverted_is_managed], [data_id]);

    if (result.affectedRows > 0) {
      return res.json({ result: true });
    } else {
      return res.status(404).json({
        error: "ERROR",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// 여기까지 develop index.js에 추가해서 merge

// 현재 차량의 cross point를 받아서 x,y좌표를 반환하는 api
app.get("/api/user/car_position_x_y", async (req, res) => {
  try {
    const query = `
    SELECT cp.data_id, cp.pos_x, cp.pos_y
    FROM car_position cp
    JOIN cross_points cr ON cp.entry_car_id = cr.point_id
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
