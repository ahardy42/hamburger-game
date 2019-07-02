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
                    userId: req.user.id
                }
            }).then(function(burger) {
                var burgerObject = burger.dataValues;
                db.Game.findAll({
                    where: {
                        userId: req.user.id
                    }
                }).then(function(game) {
                    awesomeObject = {
                        userId: req.user.id,
                        burger: burgerObject,
                        game: game.dataValues
                    }
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
