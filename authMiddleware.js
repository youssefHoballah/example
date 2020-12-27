const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { response } = require("express");
const USERNAME = "admin";
const PASSWORD = "hoballah";
module.exports = function (req, res, next) {

   
    let privatekey = fs.readFileSync(path.join(__dirname, "cert", "key.pem"), 'utf-8');

  
    if ((req.url == "/api/login" || req.url == "/login") && req.method == "POST") {

        
        if (req.body != null && req.body.name == USERNAME && req.body.password == PASSWORD) {
           
            
            let token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, privatekey, { algorithm: 'HS256' });
            res.json({ success: true, token: token });

        }
        else {
            res.json({ success: false });
        }
    }

    else if (((req.url.startsWith("/api/products") || req.url.startsWith("/products") || req.url.startsWith == "/api/categories" || req.url.startsWith("/categories")) && req.method !== "GET")
        || ((req.url.startsWith == "/api/orders" || req.url.startsWith == "/orders") && req.method !== "POST")) {
        if (typeof req.headers.authorization != "undefined") {
            let token = req.headers.authorization.split(" ")[1];
            let privatekey = fs.readFileSync(path.join(__dirname, "cert", "key.pem"), 'utf-8');

            try {

                jwt.verify(token, privatekey, { algorithm: "HS256" }, (error, decoded) => {
                    if (error) {                      
                        res.status(500).json({ error: "No match" })
                    }

                    return next();
                })

            }
            catch (err) {

            }

        }
        
        res.json({code: req.headers.authorization})
        res.statusCode=401;
        res.end();
        return;

    }
    return next();
}