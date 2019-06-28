// ================================================================
// this will call the orm with burger related garbage
// ================================================================

var orm = require("../config/orm");

var burger = {
    all: (callback) => {
        orm.selectAll("burgers", (data) => {
            callback(data);
        });
    },
    update: (object, callback) => {
        orm.updateOne(object, () => {
            orm.selectAll("burgers", (data) => {
                callback(data);
            });
        });
    },
    insert: (object, callback) => {
        orm.insertOne("burgers", object, () => {
            orm.selectAll("burgers", (data) => {
                callback(data);
            });
        });
    }
}

module.exports = burger;