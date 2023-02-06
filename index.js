var http = require("http");
var hostname = "127.0.0.1"; //내 컴퓨터 주소를 의미한다고 보면된다
var port = 8080;

//서버를 만들어주는 명령어, 첫번째 인자로 인자가 2개인 콜백함수를 넣어준다
const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      //nodejs에서 배열을 보내줘야 한다(writeHead)
      //서버에서 응답을 보낼때 json형식의(js object형) 응답을 보낼거야
      res.writeHead(200, { "Content-Type": "application/json" });
      //nodejs는 end함수의 첫번째 인자에 string형태가 들어가야한다.따라서 배열을 스트링형태로 바꿔준다
      const products = JSON.stringify([
        {
          name: "농구공",
          price: 5000,
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성되었습니다");
    }
  }
});

//hostname과 port번호로 요청을 기다리고 있겠다
//우리가 만든 서버 객체가 listen을 통해서 계속 대기하고 있다
server.listen(port, hostname);

console.log("grab market server on!");
