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
            db.User.findByPk(req.user.id, {
                include: [
                    {
                        model: db.Burger
                    },
                    {
                        model: db.Game
                    }
                ]
            }).then(function (data) {
                console.log("user name is",data.name);
                var gamesArray = [];
                data.Games.forEach((game, index) => {
                    gamesArray.push({
                        number: index + 1,
                        burger: game.dataValues.burger,
                        numEaten: game.dataValues.numEaten
                    });
                });
                var object = {
                    User: {
                        name: data.name,
                        id: data.id,
                        emamil: data.email
                    },
                    Burgers: data.Burgers,
                    Games: gamesArray
                }
                console.log(object);
                res.render("index", object);
            }).catch(function (err) {
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

    app.get("/game", function(req, res) {
        if (!req.user) {
            res.redirect("/login");
        } else {
            res.sendFile(path.join(__dirname, "../public/game.html"));
        }
    });

}
