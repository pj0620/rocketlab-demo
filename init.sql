CREATE DATABASE rocketdb;

use rocketdb;
CREATE USER 'apiuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'apiuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;