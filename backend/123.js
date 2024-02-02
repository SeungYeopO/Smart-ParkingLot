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
// /api/upload_arduino_value
// app.get("/api/upload_arduino_value", async (req, res) => {
//   const newText = req.query.text;
//   const yourId1 = 1;
//   const now = new Date(); // 현재 날짜 및 시간
//   const hour = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();
//   try {
//     const data = await pool.query(
//       `UPDATE RF_data SET signal_index = '${newText}' WHERE data_id = ${yourId1}`
//     );
//     console.log("데이터베이스 값이 업데이트되었습니다.");
//     return res.json(data[0]);
//   } catch (error) {
//     console.log(error);
//     return res.json(error);
//   }
// });

app.get("/updateDatabase", (req, res) => {
  // 변수 이름 수정
  const newText = req.query.text;
  // 변수 추가
  const yourId1 = 1;
  const yourId2 = 2;
  let is_filled_status1 = 0;
  let is_filled_status2 = 0;

  if (newText) {
    // MySQL 데이터베이스 업데이트
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("데이터베이스에 연결하는 중 오류:", err);
        res.status(500).send("데이터베이스 연결 오류");
        return;
      }

      // 새로운 텍스트에 따라 is_filled_status1 설정 (적절한 조건으로 수정 필요)
      // if (newText === "some_condition_for_status_1") {
      //   is_filled_status1 = 1;
      // } else {
      //   is_filled_status1 = 0;
      // }

      // // 새로운 텍스트에 따라 is_filled_status2 설정 (적절한 조건으로 수정 필요)
      // if (newText === "some_condition_for_status_2") {
      //   is_filled_status2 = 1;
      // } else {
      //   is_filled_status2 = 0;
      // }

      // updateQuery1의 테이블명 및 열 이름을 실제 데이터베이스 구조에 맞게 수정
      const updateQuery1 = `UPDATE RF_data SET num = '${newText}' WHERE id = ${yourId1}`;
      const updateQuery2 = `UPDATE example SET num = ${is_filled_status2} WHERE id = ${yourId2}`;

      connection.query(updateQuery1, (error1, results1) => {
        if (error1) {
          console.error("데이터베이스 업데이트 중 오류:", error1);
          res.status(500).send("데이터베이스 업데이트 오류");
        } else {
          connection.query(updateQuery2, (error2, results2) => {
            connection.release(); // 연결 풀에 연결 반환

            if (error2) {
              console.error("데이터베이스 업데이트 중 오류:", error2);
              res.status(500).send("데이터베이스 업데이트 오류");
            } else {
              console.log("데이터베이스 값이 업데이트되었습니다.");
              res.send("데이터베이스 업데이트 완료");
            }
          });
        }
      });
    });
  } else {
    res.status(400).send("유효하지 않은 값");
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
