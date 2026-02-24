// Need to add hashing passowrds
import http from "http";
import fs from "fs";
import bcrypt from "bcrypt";
const PORT = 5000;

const hashPassword = async (password) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
const verifyHash = async (realPassword, hashedPassword) => {
  const verified = await bcrypt.compare(realPassword, hashedPassword);
  return verified;
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  if (req.method === "POST" && req.url === "/signUp") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const user = JSON.parse(body);

      fs.readFile("data/users.json", async (readErr, data) => {
        let users = [];
        if (!readErr && data) {
          try {
            users = JSON.parse(data);
            if (!Array.isArray(users)) {
              users = [];
            }
          } catch {
            users = [];
          }
        }

        const existingUser = users.find((u) => u.email === user.email);
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
        if (existingUser) {
          res.writeHead(409, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              status: 409,
              message: "User with that Email already Exist | Conflict",
            }),
          );
        } else {
          users.push(user);
        }
        fs.writeFile(
          "data/users.json",
          JSON.stringify(users, null, 2),
          "utf-8",
          (err) => {
            if (err) {
              console.error("Error writing user data", err);
              res.writeHead(500, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({ message: "Failed to save User Data" }),
              );
            }
            res.writeHead(201, { "Content-Type": "application/json" });
            return res.end(
              JSON.stringify({
                status: 201,
                message: "Account Created Successfully!",
              }),
            );
          },
        );
      });
    });
  } else if (req.url === "/" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const loginData = JSON.parse(body);
      fs.readFile("data/users.json", async (err, data) => {
        if (err) {
          res.writeHead(500, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({ message: "Network or Server Error!" }),
          );
        }
        let users;
        try {
          users = JSON.parse(data);
        } catch {
          users = [];
        }
        let user = users.find((u) => u.email === loginData.email);
        if (!user) {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              status: 401,
              message: "Unauthorized | credentials are missing or Invalid.",
            }),
          );
        }
        const isMatch = await verifyHash(loginData.password, user.password);
        if (!isMatch) {
          res.writeHead(401, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({
              status: 401,
              message: "The Password is incorrect!",
            }),
          );
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            fname: user.fname,
            status: 200,
            message: "Login Successful!",
          }),
        );
      });
    });
  } else if (req.url === "/deleteAccount" && req.method === "DELETE") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const deleteAccData = JSON.parse(body);
      const userEmail = deleteAccData.email;
      const userPassword = deleteAccData.password;
      fs.readFile("data/users.json", "utf-8", async (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              code: 500,
              message: "Server Error.",
            }),
          );
        }
        let dataFromJSON;
        try {
          dataFromJSON = JSON.parse(data);
        } catch {
          dataFromJSON = [];
        }

        const user = dataFromJSON.find((u) => u.email === userEmail);
        if (!user) {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              code: 401,
              message: "Unauthorizied | Invalid Credentials.",
            }),
          );
        }

        const verified = await verifyHash(userPassword, user.password);
        if (!verified) {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              code: 401,
              message: "Unauthorizied | Invalid Credentials.",
            }),
          );
        }

        dataFromJSON = dataFromJSON.filter((u) => u.email !== userEmail);
        fs.writeFile(
          "data/users.json",
          JSON.stringify(dataFromJSON, null, 2),
          "utf-8",
          (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({
                  code: 500,
                  message: "Server Error.",
                }),
              );
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(
              JSON.stringify({
                code: 200,
                message: "Account Deleted Successfully.",
              }),
            );
          },
        );
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ code: 404, message: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
