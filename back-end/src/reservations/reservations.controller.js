const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
/**
 * List handler for reservation resources
 */
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "people", "reservation_date", "reservation_time");

async function validateBody(request, response, next) {
  const required = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  for (const item of required) {
    if (
      !request.body.data.hasOwnProperty(item) ||
      request.body.data[item] === ""
    ) {
      return next({ status: 400, message: `Missing required: '${item}'` });
    }
  }

  if (
    Number.isNaN(
      Date.parse(
        `${request.body.data.reservation_date} ${request.body.data.reservation_time}`
      )
    )
  ) {
    return next({
      status: 400,
      message:
        "'reservation_date' or 'reservation_time' field is in an incorrect format",
    });
  }

  next();

}

async function validatePeople(request, response, next) {
  if (typeof request.body.data.people !== "number") {
    return next({ status: 400, message: "'people' must be a number" });
  }

  if (request.body.data.people < 1) {
    return next({ status: 400, message: "'people' must be at least 1" });
  }

  next();
}

async function validateStatus(request, response, next) {
  if (request.body.data.status && request.body.data.status !== "booked") {
    return next({
      status: 400,
      message: `'status' cannot be ${request.body.data.status}`,
    });
  }
  next();
}

async function validateDate(request, response, next) {
  const reservationDate = new Date(`${request.body.data.reservation_date}`+ " " +`${request.body.data.reservation_time}`);

  if (reservationDate.getDay() === 2) {
    return next({
      status: 400,
      message: `Restaurant closed on Tuesdays`,
    });
  }
  
 
  if (reservationDate < Date.now()) {
    return next({
      status: 400,
      message: ` Only future reservations allowed`,
    });
  }
  next();
}

async function list(req, res) {
  let date = req.query.date;
  data = await service.list(date);
  res.json({ data });
  console.log(data);
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    validateBody,
    validatePeople,
    validateStatus,
    validateDate,
    asyncErrorBoundary(create)
  ]

};
