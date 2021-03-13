# Overview

This project contains a Node/Express/Postgres/Docker project I made on legacy code for a eCommerce front-end Website overviewing specific projects

# Running the Project Locally

TO spin up the Dockerized Database, use the following command in your terminal:

docker run --rm -it -v "/Users/chriswilson/Documents/GitHub/SDC-ProductOverview/pgdata:/var/lib/postgresql/data" -v "$(pwd):/var/sdc" -p 5432:5432 sdc-pg

** Make sure to replace /Users/chriswilson/Documents/GitHub/ with your own absolute path **

Start running the server with "npm start" or "npm run start"

# Built With

- Node.js
- Express
- Postgres
- Docker
