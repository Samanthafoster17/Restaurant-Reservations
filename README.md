# Restaurant-Reservations

![License](https://img.shields.io/badge/License-None-blue.svg "License Badge")

## Table of Contents:

- [Description](#description)

- [Link](#link)

- [Technologies](#technologies)

- [Installation](#installation)

- [Tests](#tests)

- [Questions](#questions)

- [Images](#images)

- [API-Documentation](#api-documentation)
  - [Reservations](#reservations)
  - [Tables](#tables)
  - [Possible Errors](#possible-errors)

## Description

Allows users to book, edit, search, seat, and cancel restaurant reservations as needed.

## Link

Link to live version:

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

## Tests

`npm test` runs all tests.  
`npm run test:backend` runs all backend tests.  
`npm run test:frontend` runs all frontend tests.  
`npm run test:e2e` runs only the end-to-end tests.

## Questions

Please send any questions to: Samanthafoster17@gmail.com

You may view GitHub profile here:  
-[Github Profile](https://github.com/Samanthafoster17).

## Images

![us-01-submit-after](https://user-images.githubusercontent.com/68489432/151240112-548f1e5d-7be5-4b0c-b1a6-e36867a712bd.png)
![us-01-cancel-before](https://user-images.githubusercontent.com/68489432/151240187-2b95661e-20b2-4042-b07b-4079b3448efe.png)
![us-04-create-table-submit-before](https://user-images.githubusercontent.com/68489432/151240259-eaaf117c-8fab-4b24-accf-15aff60deebf.png)
![us-04-seat-reservation-start](https://user-images.githubusercontent.com/68489432/151240337-e2f30ddb-1914-4015-82fb-627494af21a6.png)
![us-08-edit-reservation-cancel-before](https://user-images.githubusercontent.com/68489432/151240784-54d9fd05-d89d-4e29-acd8-78e0b9af49d3.png)
![us-08-dont-cancel-reservation-after](https://user-images.githubusercontent.com/68489432/151240467-fd805cf9-a875-4419-b456-09a1b67f8743.png)

## API Documentation

Restaurant-Reservations API is a JSON based RESTful API. All requests are made to endpoints beginning:  
`http://localhost:5000`

## Reservations

### Endpoints

- [reservations](#reservations)
- [reservations/reservation_id](#reservation_id)
- [reservations/reservation_id/status](#status)

#### reservations

`/reservations`

Accepts `GET` and `POST` requests.

`GET` requests returns a list of reservations.

Which also accepts the following optional query parameters:
| Parameter      | Type   | Required | Description |
| :------------: | :----: | :------: | :---------: | 
| `date`         | string | no       | Returns reservations where `reservation_date` matches the date provided. |
| `mobile_number`| string | no       | Returns reservations where `reservation_mobile_number` matches the mobile number provided, partial or full mobile number may be used to retrieve.|


An example request looks like this:  
 `GET http://localhost:5000/reservations`

An example response looks like this:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

 {
"data":[
{
"reservation_id": 3,
"first_name": "Bird",
"last_name": "Person",
"mobile_number": "808-555-0141",
"people": 1,
"status": "booked",
"reservation_date": "2022-12-30T05:00:00.000Z",
"reservation_time": "18:00:00",
"created_at": "2022-12-10T08:31:32.326Z",
"updated_at": "2022-12-10T08:31:32.326Z"
},
{
"reservation_id": 2,
"first_name": "Frank",
"last_name": "Palicky",
"mobile_number": "202-555-0153",
"people": 1,
"status": "booked",
"reservation_date": "2022-12-30T05:00:00.000Z",
"reservation_time": "20:00:00",
"created_at": "2022-12-10T08:31:32.326Z",
"updated_at": "2022-12-10T08:31:32.326Z"
},
{
"reservation_id": 1,
"first_name": "Rick",
"last_name": "Sanchez",
"mobile_number": "202-555-0164",
"people": 6,
"status": "booked",
"reservation_date": "2022-12-31T05:00:00.000Z",
"reservation_time": "20:00:00",
"created_at": "2022-12-10T08:30:32.326Z",
"updated_at": "2022-12-10T08:30:32.326Z"
  }
 ]
}
```  

`POST` request creates a new reservation.

Example request:

`POST http://localhost:5000/reservations`

```
HTTP/1.1
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{"data":
 {"first_name":"Tiger",
"last_name":"Lion",
"mobile_number":"808-555-0140",
"reservation_date":"2025-12-30",
"reservation_time":"18:00:00",
"people":3
 }
}
```

With the following fields:
| Field          | Type  | Required  | Description |
| :------------: | :----: | :------: | :---------: |
| `first_name`   | string | yes      | First name of the customer   |
| `last_name`    | string | yes      | Last name of the customer    |
| `mobile_number`| string | yes      | Mobile number of the customer|
| `people`       |integer | yes      | Amount of people attending   |
|`reservation_date`| date   | yes    | Date of reservation |
|`reservation_time`| time   | yes    | Time of reservation |

An example of a `POST` response is:

```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
"data":{
reservation_id": 4,
"first_name": "Tiger",
"last_name": "Lion",
"mobile_number": "808-555-0140",
"people": 3,
"status": "booked",
"reservation_date": "2025-12-30T05:00:00.000Z",
"reservation_time": "18:00:00",
"created_at": "2020-12-10T08:31:32.326Z",
"updated_at": "2020-12-10T08:31:32.326Z"
 }
}
```

The Post object contains all fields sent through the `POST` request, in addition to adding timestamps and a default `"status": "booked"`.

#### reservation_id

`/reservations/:reservation_id`
Accepts `GET` and `PUT` requests.
For the examples of these methods, we will use `reservation_id: 1`.

`GET` requests returns the corresponding reservation object.

An example request looks like this:
`GET http://localhost:5000/reservations/1`

An example response looks like this:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
"data":{
reservation_id": 1,
"first_name": "Rick",
"last_name": "Sanchez",
"mobile_number": "202-555-0164",
"people": 6,
"status": "booked",
"reservation_date": "2022-12-31T05:00:00.000Z",
"reservation_time": "20:00:00",
"created_at": "2022-12-10T08:30:32.326Z",
"updated_at": "2022-12-10T08:30:32.326Z"
 }
}
```

`PUT` requests updates the information for the specified reservation.

All fields required during `POST` for `/reservations` are also required for `PUT` requests.

In this example we are going to update our reservation to have 4 people instead of 6

Example of this `PUT` request looks like this:

`http://localhost:5000/reservations/1`

```
HTTP/1.1
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
"data":{
"first_name": "Rick",
"last_name": "Sanchez",
"mobile_number": "202-555-0164",
"people": 4,
"reservation_date": "2022-12-31",
"reservation_time": "20:00:00"
 }
}
```

An example of this `PUT` response looks like this:

```
HTTP/1.1  200 OK
Content-Type: application/json; charset=utf-8

{
"data":{
"reservation_id": 1,
"first_name": "Rick",
"last_name": "Sanchez",
"mobile_number": "202-555-0164",
"people": 4,
"status": "booked",
"reservation_date": "2022-12-31T05:00:00.000Z",
"reservation_time": "20:00:00",
"created_at": "2220-12-10T08:30:32.326Z",
"updated_at": "2220-12-10T08:30:32.326Z"
 }
}
```

#### status

`/reservations/:reservation_id/status`
Accepts `PUT` requests.

`PUT` requests updates the status of the selected reservation.

The status of the reservation has a default value of `"status": "booked"` when created, a value of `"status": "seated"` when assigned to a table, a value of `"status": finished"` when the reservation is complete and table becomes available, and a value of `"status": "cancelled"` if the reservation is no longer needed.

An example of a `PUT` request looks like this:

`PUT http://localhost:5000/reservations/1/status`

```
HTTP/1.1
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
"data":{
"status": "seated"
 }
}
```

An example of this response looks like this:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
"data":{
"reservation_id": 1,
"first_name": "Rick",
"last_name": "Sanchez",
"mobile_number": "202-555-0164",
"people": 4,
"status": "seated",
"reservation_date": "2022-12-31T05:00:00.000Z",
"reservation_time": "20:00:00",
"created_at": "2220-12-10T08:30:32.326Z",
"updated_at": "2220-12-10T08:30:32.326Z"
 }
}
```

### Tables

### Endpoints

- [tables](#tables)
- [tables/table_id/seat](#seat)

#### tables

`/tables`

Accepts `GET` and `POST` requests.

`GET` requests returns a list of tables.

An example request looks like this:  
`GET http://localhost:5000/tables`

An example response looks like this:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
"data":[
{
"table_id": 1,
"table_name": "#1",
"capacity": 6,
"reservation_id": 14,
"created_at": "2022-01-23T03:16:00.141Z",
"updated_at": "2022-01-23T03:16:00.141Z"
},
{
"table_id": 2,
"table_name": "#2",
"capacity": 6,
"reservation_id": null,
"created_at": "2022-01-23T03:16:00.141Z",
"updated_at": "2022-01-23T03:16:00.141Z"
  },
 ]
}
```

`POST` request creates a new table.

Example request:

`POST http://localhost:5000/tables`

```
HTTP/1.1
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
"data":{
  "table_name": "#4",
"capacity": 6
 }
}
```

With the following fields:
| Field          |   Type | Required | Description |
| :------------: | :----: | :------: | :---------: |
| `table_name`     | string | yes      | Name of new table. |
| `capacity`       |integer | yes      | Maximum amount of people that may be seated at the table. |

An example of a `POST` response is:

```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
"data":{
"table_id": 6,
"table_name": "#4",
"capacity": 6,
"reservation_id": null,
"created_at": "2022-01-26T16:46:39.236Z",
"updated_at": "2022-01-26T16:46:39.236Z"
 }
}

```

#### seat

`/tables/:table_id/seat`
Accepts `PUT`, and `DELETE` requests.

`PUT` requests assigns a reservation_id to the table specified by the table_id, which determines the assigned reservation is seated at the specified table.

For the example, we will continue to use `reservation_id: 1`, and `table_id: 2`

An example request looks like this:

`PUT http://localhost:5000/tables/table_id/seat`

```
HTTP/1.1
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
"data":{
"reservation_id": "1"
 }
}
```

An example response looks like this:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
"data":[
{
"table_id": 2,
"table_name": "#2",
"capacity": 6,
"reservation_id": 1,
"created_at": "2022-01-23T03:16:00.141Z",
"updated_at": "2022-01-23T03:16:00.141Z"
  }
 ]
}
```

`DELETE` requests removes the `reservation_id` that has been assigned to the table by the specified `table_id`,
updating the corresponding reservation `"status": "finished"` and the table becomes available.

An example request looks like this:

`DELETE http://localhost:5000/tables/2/seat`

```
HTTP/1.1 204 No Content
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
"data":{
"table_id": "2"
 }
}
```

An example response looks like this:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data":
    {"table_id":2,
    "table_name":"#2",
    "capacity":6,
    "reservation_id":null,
    "created_at":"2022-01-26T20:47:03.285Z",
    "updated_at":"2022-01-26T20:47:03.285Z"
     },
    }
```

### Possible Errors

| Error code |                                        Description                                        |
| :--------: | :---------------------------------------------------------------------------------------: |
|    400     | Missing required field, or given value of a required field does not meet the requirements |
|    404     |    Provided `table_id`, `reservation_id` has no match, or requested URL is not found.     |
|    405     |                           Method not allowed for requested URL                            |
|    500     |                                Express API error handler.                                 |
