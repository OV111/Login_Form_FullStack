import http from "http";
import fs from "fs";
const PORT = 5000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "POST" && req.url === "/signUp") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const user = JSON.parse(body);
      // const newUserData = JSON.stringify(user)

      fs.readFile("data/users.json", (readErr, data) => {
        let users = [];
        if (!readErr && data) {
          try {
            users = JSON.parse(data);
            if (!Array.isArray(users)) { users = []; }
          } catch { users = []; }
        }

        const existingUser = users.find(u => u.email === user.email)
        if (existingUser) {
          res.writeHead(409, {"content-type" : "application/json"})
          res.end(JSON.stringify({message: "User with that Email already Exist | Conflict"}))
        } else { users.push(user); }
        
        // console.log(user);
        fs.writeFile("data/users.json",JSON.stringify(users, null,2),"utf-8",(err) => {
            if (err) {
              console.error("Error writing user data", err);
              res.writeHead(500, { "content-type": "application/json" });
              res.end(JSON.stringify({ message: "Failed to save User Data" }));
            } 
            res.writeHead(201, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "User Registered | Created" }));
          }
        );
      });
    });
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ code: 404, message: "Not Found" }));
  }
});
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/signUp`);
});
