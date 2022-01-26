# Restaurant-Reservations
   
![License](https://img.shields.io/badge/License-None-blue.svg "License Badge")


## Table of Contents:

- [Description](#description)

- [Technologies](#technologies)

- [Installation](#installation) 

- [Images](#images)

- [Tests](#tests)

- [Questions](#questions)

- [API-Documentation](#api-documentation)


## Description
Allows users to book, edit, search, seat, and cancel restaurant reservations as needed.   

## Technologies 
Front end: React, Bootstrap.  
Backend: NodeJS, Express.  
Database is PostgreSQL hosted by ElephantSQL.  
  
## Installation 
Fork and clone this repository.  
Run `cp ./back-end/`,  
Create a .env file in ./back-end/.env, with the connection URL's to your database instance.  
From ./back-end run:   
`npm install`,  
`npx migrate:latest`,  
`npx knex seed:run`,  
Run `cp ./front-end/`,  
Create a .env file in ./front-end/.env you may connect to a backend or connect http://localhost:5000.  
Run `npm run start` from root directory.  
   
## Images


 
  
## Tests
`npm test` runs all tests.
`npm run test:backend` runs all backend tests.  
`npm run test:frontend` runs all frontend tests.  
`npm run test:e2e` runs only the end-to-end tests. 
  
## Questions 
Please send any questions to:   Samanthafoster17@gmail.com  

You may view GitHub profile here:   
-[Github Profile](https://github.com/Samanthafoster17).  

## API Documentation
Restaurant-Reservations API is a JSON RESTful API.  

Endpoints:  

"/reservations"  
accepts GET and POST requests.   

GET requests returns a list of reservations.  

An example request looks like this:  
 GET http://localhost:5000/reservations  

An example response looks like this:  
HTTP/1.1 200 OK  
Content-Type: application/json; charset=utf-8  

```
 {
"data":[
{
"reservation_id": 3,
"first_name": "Bird",
"last_name": "Person",
"mobile_number": "808-555-0141",
"people": 1,
"status": "booked",
"reservation_date": "2020-12-30T05:00:00.000Z",
"reservation_time": "18:00:00",
"created_at": "2020-12-10T08:31:32.326Z",
"updated_at": "2020-12-10T08:31:32.326Z"
},
{
"reservation_id": 2,
"first_name": "Frank",
"last_name": "Palicky",
"mobile_number": "202-555-0153",
"people": 1,
"status": "booked",
"reservation_date": "2020-12-30T05:00:00.000Z",
"reservation_time": "20:00:00",
"created_at": "2020-12-10T08:31:32.326Z",
"updated_at": "2020-12-10T08:31:32.326Z"
},
{
"reservation_id": 1,
"first_name": "Rick",
"last_name": "Sanchez",
"mobile_number": "202-555-0164",
"people": 6,
"status": "booked",
"reservation_date": "2020-12-31T05:00:00.000Z",
"reservation_time": "20:00:00",
"created_at": "2020-12-10T08:30:32.326Z",
"updated_at": "2020-12-10T08:30:32.326Z"
  }
 ] 
}
```  

POST request creates a new reservation.

Example request:

POST http://localhost:5000/reservations  
HTTP/1.1  
Content-Type: application/json  
Accept: application/json  
Accept-Charset: utf-8  

```
{"data":
 {"first_name":"Samantha",     
"last_name":"Foster",   
"mobile_number":"4437269854",
"reservation_date":"2022-01-29",
"reservation_time":"12:30",
"people":8  
 }
}
```  

With the following fields:
|   Parameter    | Type   | Required |
| :------------: | :----: | :------: |
|   first_name   | string |  yes     |
|   last_name    | string |  yes     |
|  mobile_number | string |  yes     |
|reservation_date|  date  |  yes     |
|reservation_time|  time  |  yes     |

An example of a POST response is:

HTTP/1.1 201 OK  
Content-Type: application/json; charset=utf-8  

```
{
"data":{
"reservation_id": 21,
"first_name": "Samantha",
"last_name": "Foster",
"mobile_number": "4437269854",
"people": 8,
"status": "booked",
"reservation_date": "2022-01-29T05:00:00.000Z",
"reservation_time": "12:30:00",
"created_at": "2022-01-26T05:58:27.516Z",
"updated_at": "2022-01-26T05:58:27.516Z"
 }
}
```  

The Post object contains all fields sent through the request, in addition to adding timestamps and a default status of "booked".
