SET GLOBAL validate_password.policy = 'LOW';

CREATE DATABASE IF NOT EXISTS ${db_name};
CREATE USER IF NOT EXISTS '${username}'@'localhost' IDENTIFIED BY '${password}';
GRANT ALL PRIVILEGES ON ${db_name}.* TO '${username}'@'localhost';
FLUSH PRIVILEGES;

SHOW DATABASES;
SHOW GRANTS FOR '${username}'@'localhost';
