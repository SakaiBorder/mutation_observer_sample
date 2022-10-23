const http = require('http');
const fs = require('fs')

const port = 3000;

const server = http.createServer((req, res) => {
  var url = "public" + req.url;
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        if (url.endsWith('js')) {
          res.writeHead(200, {"Content-Type": "text/javascript"});
        } else if(url.endsWith('css')) {
          res.writeHead(200, {"Content-Type": "text/css"});
        } else {
          res.writeHead(200, {"Content-Type": "text/html"});
        }

        res.end(data);
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});