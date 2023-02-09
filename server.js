const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require("./models");
const product = require("./models/product");

//express앱에대한 설정을 해준다
//서버에서도 json형식의 데이터를 처리하도록 코드를 작성
app.use(express.json());
//모든 브라우저에서 내 서버에 요청을 할 수 있다
app.use(cors());

//해당 경로로 get요청이 왔을때 두번째 인자의 코드가 실행된다
app.get("/products", (req, res) => {
  //product테이블에 있는 모든 데이터를 가져온다
  models.Product.findAll({
    //갯수제한을 준다
    //limit:
    //정렬 기준을 바꾼다. createdAt을 기준으로 내림차순으로 보여준다 = 최신순으로 보여줌
    order: [["createdAt", "DESC"]],
    //어떤 컬럼을 가져올건지 설정한다
    attributes: ["id", "name", "price", "seller", "createdAt", "imageUrl"],
  })
    .then((result) => {
      console.log("PRODUCTS:", result);
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러 발생");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, price, seller, description } = body;
  if (!name || !price || !seller || !description) {
    //방어코드 작성
    res.send("모든 필드를 입력해주세요.");
  }
  //product 테이블에 안에 들어있는 객체를 생성할거야, 기본적으로 비동기처리
  models.Product.create({
    name: name,
    price: price,
    seller: seller,
    description,
  })
    .then((result) => {
      console.log("상품 생성 결과:", result);
      res.send({
        result: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 업로드에 문제가 발생했습니다");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  // 하나만 찾고 싶을때는 findOne(객체)
  models.Product.findOne({
    //객체에 다양한 조건을 넣을 수 있다
    where: {
      //id컬럼과 일치하는 id값을 불러온다
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT:", result);
      res.send({
        //product는 key , result는 value
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 조회에 에러가 발생했습니다");
    });
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공!");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB 연결 실패!");
      process.exit();
    });
});
