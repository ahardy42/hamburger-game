// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
// requiring models so we can sync
var db = require("./models");
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. heroku uses the process.env.PORT option
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// loads static files to style and handle JS functionality on the front end
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "ninja", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars. and use it to render the html
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ================================================================================
// ROUTER
// ================================================================================

// Requiring our routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);


// =============================================================================
// LISTENER
// =============================================================================

db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
