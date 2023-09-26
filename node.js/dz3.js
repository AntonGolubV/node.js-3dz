/* Разработать веб-сайтик, который обладает тремя и более страницами + главной, на которой аккумулированы ссылки как минимум на 3 остальные

Если нет вдохнвоения, то вертите колесо фортуны с рандомными сайтиками и просто минималистично повторите любой выпавший веб-ресурс.

С поправкой на то, что красота страниц пока не важна. Важен контент, который отдаётся с сервера.

· Каждая из страниц должна загружаться с back-end'a по соответствующим путям, прописанным после порта localhost:port/path

Сайтик хостить на случайном порте, который соответствует вашему году рождения.

Усложнение: на каждой странице, кроме главной обязательно должны присутствовать как минимум одно изображение + применённые к содержимому стили (CSS), подключенные в виде отдельного файла */
  
  const http = require("http");
  const fs = require("fs");       //модуль для работы с  (ФС) файловой системой
  const path = require("path");   //модуль для работы с путями в ФС
  
  // MIME-типы. Необходимы, чтобы клиент, который принимает наш контент, понимал, как с ним работать.
  const contentTypes = {
    ".ico": "image/x-icon",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
  
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };
  
  //создаём ссылку на созданный сервер для последующего старта прослушивания порта
  webApp = http.createServer(function (request, response) {
    console.log(`Url: ${request.url}`);
  
    switch (request.url) {
      case "/":
        response.writeHead(301, {
          Location: "index.html",
          "Content-Type": "text/html; charset=utf-8",
        });
        response.end();
        break;
  
      case "/ml":
        response.writeHead(301, { 
            Location: "ml.html",
            "Content-Type": "text/html; charset=utf-8", 
        });
        response.end();
        break;
  
      case "/pt":
        response.writeHead(301, { 
            Location: "pt.html",
            "Content-Type": "text/html; charset=utf-8", 
        });
        response.end();
        break;

      case "/pr":
        response.writeHead(301, { 
            Location: "pr.html",
            "Content-Type": "text/html; charset=utf-8", 
        });
        response.end();
        break;

      case "/ze":
        response.writeHead(301, { 
            Location: "ze.html",
            "Content-Type": "text/html; charset=utf-8", 
        });
        response.end();
        break;

      case "/r":
        response.writeHead(301, { 
            Location: "r.html",
            "Content-Type": "text/html; charset=utf-8", 
        });
        response.end();
        break;
  
  
      
      default:
        
        const filePath = path.join("./public", request.url.substring(1));
        console.log(filePath);
  
      
        fs.access(filePath, fs.constants.R_OK, (err) => {
          if (err) {  
            response.writeHead(404, {
              "Content-Type": "text/html; charset=utf-8",
            });
  
            response.end("<h1>Netu</h1>");
          } else {   
            const extname = path.extname(filePath);   
  
            const contentType =
              contentTypes[extname] || "application/octet-stream";
  
            response.writeHead(200, {
              "Content-Type": contentType,
            });
  
           
            fs.createReadStream(filePath).pipe(response);
          }
        });
    }
  });
  
  webApp.listen(1313, "127.0.0.1", function () {
    console.log("start 127.0.0.1:1313");
  });
  
  