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
