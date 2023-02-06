const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

//express앱에대한 설정을 해준다
//서버에서도 json형식의 데이터를 처리하도록 코드를 작성
app.use(express.json());
//모든 브라우저에서 내 서버에 요청을 할 수 있다
app.use(cors());

//해당 경로로 get요청이 왔을때 두번째 인자의 코드가 실행된다
app.get("/products", (req, res) => {
  const query = req.query;
  console.log("Query:", query);
  //일반적으로 응답을 줄때 express서버에서 응답에 자동으로 status code를 넣어 보내준다
  res.send({
    //객체 products key에 해당 배열 값을 넣어준다
    products: [
      {
        id: 1,
        name: "농구공",
        price: 100000,
        seller: "조던",
        imageUrl: "images/products/basketball1.jpeg",
      },
      {
        id: 2,
        name: "축구공",
        price: 50000,
        seller: "메시",
        imageUrl: "images/products/soccerball1.jpg",
      },
      {
        id: 3,
        name: "키보드",
        price: 10000,
        seller: "그랩",
        imageUrl: "images/products/keyboard1.jpg",
      },
    ],
  });
});

app.post("/products", (req, res) => {
  const body = req.body;
  res.send({
    //body라는 키에 body값이 들어간다
    body: body,
  });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  res.send(`id는 ${id}입니다`);
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다");
});
