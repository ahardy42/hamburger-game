// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log("req body", req.body);
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                console.log("switch to login");
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // burger routes for CRUD actions related to burgers
    app.post("/api/burger", function (req, res) {
        if (!req.user) {
            res.redirect("/login");
        } else {
            db.Burger.create({
                name: req.body.name,
                isDevoured: req.body.isDevoured
            }).then(function (burger) {
                console.log(burger);
                res.json(burger);
            }).catch(function (err) {
                res.status(401).json(err);
            });
        }
    });

    app.put("/api/burger/:id", function (req, res) {
        var id = req.params.id;
        var updatedBurger = {
            isDevoured: req.body.isDevoured
        };
        if (!req.user) {
            res.redirect("/login");
        } else {
            db.Burger.update(updatedBurger, {
                where: {
                    id: id,
                    userId: req.user.id
                }
            }).then(function (burger) {
                res.json(burger);
            }).catch(function (err) {
                res.status(401).json(err);
            });
        }
    });

    app.delete("/api/burger/:id", function (req, res) {
        var id = req.params.id;
        if (!req.user) {
            res.redirect("/login");
        } else {
            db.Burger.destroy({
                where: {
                    id: id
                }
            }).then(function (burger) {
                res.json(burger);
            }).catch(function (err) {
                res.status(401).json(err);
            });
        }
    });

    // game post to update game db with stats
    app.post("/api/game", function (req, res) {
        if (!req.user) {
            res.redirect("/login");
        } else {
            db.Game.create(req.body).then(function (game) {
                res.json(game);
            }).catch(function (err) {
                res.status(401).json(err);
            });
        }
    });
};
