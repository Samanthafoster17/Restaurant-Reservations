const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

/**
 * List handler for reservation resources
 */
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "people",
  "reservation_date",
  "reservation_time"
);

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
  const reservationDate = new Date(
    `${request.body.data.reservation_date} ${request.body.data.reservation_time}`
  );

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

async function validateTime(request, response, next) {
  const reservationTime = new Date(
    `${request.body.data.reservation_date} ${request.body.data.reservation_time}`
  );

  if (
    (reservationTime.getHours() === 10 && reservationTime.getMinutes() < 30) ||
    reservationTime.getHours() < 10
  ) {
    return next({
      status: 400,
      message: `Restaurant opens at 10:30am`,
    });
  }

  if (
    (reservationTime.getHours() === 21 && reservationTime.getMinutes() > 30) ||
    reservationTime.getHours() > 21
  ) {
    return next({
      status: 400,
      message: `Reservations not available after 9:30pm`,
    });
  }

  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;

  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `${reservation_id} does not match any reservations.`,
  });
}

async function read(req, res) {
  res.json({ data: res.locals.reservation });
}

async function list(req, res) {
  const { date, currentDate, mobile_number } = req.query;
  if (date) {
    data = await service.listByDate(date);
    res.json({ data });
  } else if (currentDate) {
    data = await service.listByDate(currentDate);
    res.json({ data });
  } else if (mobile_number) {
    data = await service.search(mobile_number);
    res.json({ data });
  } else {
    res.json({ data: await service.list() });
  }
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function updateStatus(req, res, next) {
  const { reservation_id } = req.params;
  const updRes = {
    ...req.body.data,
    reservation_id,
  };
  const updStat = await service.updateStatus(updRes);
  res.json({ data: updStat[0] });
}

async function update(req, res, next) {
  const { reservation_id } = req.params;
  const updRes = {
    ...req.body.data,
    reservation_id,
  };
  const updStat = await service.update(updRes);
  res.json({ data: updStat[0] });
}

async function statusUnkown(req, res, next) {
  const status = req.body.data.status;

  if (status === "unknown") {
    return next({
      status: 400,
      message: ` status is unknown.`,
    });
  }
  next();
}

async function statusFinished(req, res, next) {
  const status = res.locals.reservation.status;

  if (status === "finished") {
    return next({
      status: 400,
      message: ` status is finished.`,
    });
  }
  next();
}

// async function statusCancelled(req, res, next) {
//   const status = req.body.data;
//   if(status && status === 'cancelled'){
//     res.status(200)
//   }
// }

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    validateBody,
    validatePeople,
    validateStatus,
    validateDate,
    validateTime,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  update: [
    hasRequiredProperties,
    validateBody,
    validatePeople,
    validateStatus,
    validateDate,
    validateTime,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusFinished,
    statusUnkown,
    asyncErrorBoundary(updateStatus),
  ],
};
