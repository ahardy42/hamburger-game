// Requiring our models
var db = require("../models");

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

    // get route for main page
    app.get("/", isAuthenticated, function(req, res) {
        if (!req.user) {
            res.redirect("/login");
        } else {
            // get an object to render w/ handlebars
            db.Burger.findAll({
                where: {
                    UserId: req.user.id
                }
            }).then(function(burgers) {
                console.log("htmlRoutes 25 burger is",burgers);
                var burgerObject = burgers;
                db.Game.findAll({
                    where: {
                        UserId: req.user.id
                    }
                }).then(function(games) {
                    console.log("htmlRoutes 32 game is",games);
                    awesomeObject = {
                        UserId: req.user.id,
                        burgers: burgerObject,
                        games: games
                    };
                    console.log("htmlRoutes.js line 36 - awesome object is:",awesomeObject);
                    res.render("index", awesomeObject);
                }).catch(function(err) {
                    console.log(err);
                });
            }).catch(function(err) {
                console.log(err);
            });
        }
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (!req.user) {
            res.sendFile(path.join(__dirname, "../public/login.html"));
        } else {
            res.redirect("/");
        }
    });

    app.get("/signup", function (req, res) {
        if (!req.user) {
            res.sendFile(path.join(__dirname, "../public/signup.html"));
        } else {
            res.redirect("/");
        }
    });

}
