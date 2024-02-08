const http = require('http');
const getUsers = require('./modules/users');
const port = 3003;

const server = http.createServer((request, response) => {
  const ipAddress = 'http://127.0.0.1';
  const url = new URL(request.url, ipAddress);
  const searchParams = url.searchParams;

  for (key of searchParams.keys()) {
    if (key !== 'hello' && key !== 'users') {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end(`Key ${key} not found`);

      return;
    }
  }

  if (searchParams.has('hello')) {
    const userName = searchParams.get('hello');
    if (!userName) {
      //   response.status = 400;         //почему так не работает?
      //   response.header = 'Content-Type: text/plain';
      response.writeHead(400, { 'Content-Type': 'text/plain' });
      response.write(`Enter a name`);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write(`Hello, ${userName}!`);
      response.end();
    }
  } else if (searchParams.has('users')) {
    response.status = 200;
    response.statusMessage = 'OK';
    response.header = 'Content-Type: application/json';
    response.write(getUsers());
    response.end();
  } else {
    response.status = 200;
    response.statusMessage = 'OK';
    response.header = 'Content-Type: text/plain';
    response.write('Hello, world!');
    response.end();
  }
});

server.listen(port, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${port}`);
});
