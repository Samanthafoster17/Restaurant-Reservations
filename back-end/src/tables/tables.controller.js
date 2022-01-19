const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const { read: readRes, } = require("../reservations/reservations.service")
/**
 * List handler for table resources
 */
const hasRequiredProperties = hasProperties("table_name", "capacity");
const hasResId = hasProperties("reservation_id");

async function validateBody(request, response, next) {
  const required = [
    "table_name",
    "capacity",
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
      `${request.body.data.reservation_capacity}`
    )
  ) {
    return next({
      status: 400,
      message:
        "'capacity' field is in an incorrect format",
    });
  }

  next();

}




async function validateTableName(request, response, next) {
  if (typeof request.body.data.table_name === " ") {
    return next({ status: 400, message: "'table_name' can not be empty" });
  }

  if (request.body.data.table_name.length <= 1) {
    return next({ status: 400, message: "'table_name' must be at least 1 character long" });
  }

  next();
}


async function validateCapacity(request, response, next) {
  if (typeof request.body.data.capacity !== "number") {
    return next({ status: 400, message: "'capacity' must be a number" });
  }

  if (request.body.data.capacity === 0) {
    return next({ status: 400, message: "'capacity' must be at least 1" });
  }

  next();
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;

  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  return next({ status: 404, message: `${table_id} does not match any tables.` });
}


async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;

  const reservation = await readRes(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({ status: 404, message: `reservation_id ${reservation_id} does not match any reservations.` });
}


async function checkAvailability(req, res, next) {
  const { reservation_id } = res.locals.table;
  if(reservation_id) {
    return next({ status: 400, message: `table occupied`})
  }
 next()
}

async function checkCapacity(req, res, next) {
  const { capacity } = res.locals.table;
  const { people } = res.locals.reservation;
  if(capacity < people) {
    return next({ status: 400, message: `table does not have sufficient capacity` })
  }
  next()
}

async function checkIfOccupied(req, res, next) {
  const { status } = res.locals.table;
  if(status !== 'occupied') {
    return next({ status: 400, message: `table not occupied`})
  }
 next()
}


async function resIsSeated(req, res, next) {
  const { reservation_id } = req.body.data;

  const reservation = await readRes(reservation_id);
  if (reservation.status === 'seated') {
    return next({ status: 400, message: `${reservation_id} already seated.` });
    
  }
  next();
}


async function read(req, res) {
  res.json({ data: res.locals.table })
}



async function list(req, res) {
  data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable[0] });
}

async function update(req, res) {
  const updTable = {
    ...res.locals.table,
    ...req.body.data,
    table_id: res.locals.table.table_id
  }

  const data = await service.update(updTable)
  res.json({ data })
}


async function destroy(req, res) {
 const { table_id } = res.locals.table;
 const { reservation_id } = res.locals.table;

  await service.delete({table_id, reservation_id});
  const data = await service.list();
  res.json({ data })
}



module.exports = {
  list: list,
  create: [
    hasRequiredProperties,
    validateBody,
    validateTableName,
    validateCapacity,
    asyncErrorBoundary(create)
  ],
  read: [
    asyncErrorBoundary(tableExists),
    read
  ],

  update: [
    hasResId,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    checkAvailability,
    resIsSeated,
    checkCapacity,
    asyncErrorBoundary(update)
  ],

  delete: [
    // hasResId,
    asyncErrorBoundary(tableExists),
    checkIfOccupied,
    // asyncErrorBoundary(reservationExists),
    destroy
  ]


};
