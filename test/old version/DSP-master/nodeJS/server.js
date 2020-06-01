let http = require("http");

let server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('Привет пошел на хуй');
});

server.listen(1000, 'localhost');
