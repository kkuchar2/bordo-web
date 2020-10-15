#!/bin/bash
printf "\n"
printf "\n"
printf "Setting up MySQL database and user (needed MySQL root password)..."
printf "\n"
printf "\n"

# Replace template for mysql database and user creation
cp mysql_template.txt prepare_db.sql
sed -i -e "s%\${db_name}%$MYSQL_DATABASE%" -e "s%\${username}%$MYSQL_USER%" -e "s%\${password}%$MYSQL_PASSWORD%" prepare_db.sql

# Create mysql database and user
mysql --verbose -u root -p < prepare_db.sql
