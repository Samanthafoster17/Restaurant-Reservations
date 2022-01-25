const knex = require("../db/connection");

function list() {
  return knex("reservations")
    .select("*")
    .whereNot({ status: "finished" })
    .andWhereNot({ status: "cancelled" })
    .orderBy("reservation_date")
    .orderBy("reservation_time");
}

function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .andWhereNot({ status: "cancelled" })
    .orderBy("reservation_time");
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date")
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .then((reservation) => reservation[0]);
}

function create(newReservation) {
  return knex("reservations")
    .insert({
      ...newReservation,
      status: "booked",
    })
    .returning("*")
    .then((newReservation) => newReservation[0]);
}

function updateStatus(updRes) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updRes.reservation_id })
    .update({ status: updRes.status })
    .returning("*");
}

function update(updRes) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updRes.reservation_id })
    .update(updRes, "*");
}

module.exports = {
  list,
  read,
  create,
  updateStatus,
  search,
  listByDate,
  update,
};
