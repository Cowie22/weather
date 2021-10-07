DROP DATABASE IF EXISTS weather;

CREATE DATABASE weather;

USE weather;

-- Very simple table, mostly implemented to demonstrate backend experience for this challenge.
-- There is definitely potential to utilize the database further, especially to make the app
-- More optimized. Such as, once the weather is requested for a particualr city, all of the pertinent information
-- Could be saved in the database and returned from the database, instead of having to go the API every time.

CREATE TABLE city (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  latitude int NOT NULL,
  longitude int NOT NULL,
  PRIMARY KEY (id)
);

INSERT into city (name, latitude, longitude) VALUES ("Lake Tahoe", 38, -119);

/*  Execute this file from the command line by typing:
 *    mysql -u root -p < schema.sql
 *  to create the database and the tables.*/