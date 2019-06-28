/* remove this DB if it's already there */
DROP DATABASE IF EXISTS burger_db;

/* create, and reference the database */
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers (
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(100) NOT NULL,
    isDevoured BOOLEAN NOT NULL,
    createdat TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

