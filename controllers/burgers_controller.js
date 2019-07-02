var express = require("express");

var router = express.Router();

var sequelize = require("../models");

/*
* the controller uses the ORM to get info from the database
* it then turns the data returned into an object
* and punts it out to the interwebs using the res.render() function and handlebars! 
*/





router.get("/", (req, res) => {
    // chuck i had a double burger... 

});

router.put("/update", (req, res) => {
    // update isEaten value of a burger
    var updatedBurger = req.body;
 
});

router.post("/burger", (req, res) => {
    var newBurger = req.body;

})

// Export routes for server.js to use.
module.exports = router;