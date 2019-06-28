var connection = require("./connection");


// Helper function to convert object key/value pairs to SQL syntax
const insertColsAndValues = (object) => {
    let colsArray = [];
    let valuesArray = [];
    for (const key in object) {
        colsArray.push(key);
        valuesArray.push(object[key]);
    }
    return [colsArray, valuesArray];
}

const updateHelper = (object) => {
    let arr = [];
    for (const key in object) {
        arr.push(key);
        arr.push(object[key]);
    }
    return arr;
}

var orm = {
    // select all query
    selectAll: (table, callback) => {
        const sqlString = "SELECT * FROM ??";
        connection.query(sqlString, [table], (err, data) => {
            if (err) console.log(err);
            callback(data);
        });
    },
    updateOne: (object, callback) => {
        const sqlString = "UPDATE burgers SET ?? = ? WHERE ?? = ?";
        const inserts = updateHelper(object);
        connection.query(sqlString, inserts, (err, data) => {
            if (err) console.log(err);
            callback(data);
        });
    },
    insertOne: (table, object, callback) => {
        const columns = insertColsAndValues(object)[0];
        const updatedColumns = insertColsAndValues(object)[1];
        const sqlString = "INSERT INTO ?? (??) VALUES (?)";
        connection.query(sqlString, [table, columns, updatedColumns], (err, data) => {
            if (err) console.log(err);
            callback(data);
        });
    }

}

module.exports = orm;