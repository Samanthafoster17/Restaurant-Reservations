const knex = require("../db/connection");

function list(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time", "asc");
}

function read(reservation_id) {
    return knex("reservations")
    .where({ reservation_id })
    .first();
}

function create(newReservation){
 return knex("reservations")
 .insert(newReservation)
 .returning("*")
 .then((newReservation) => newReservation[0]);
}

module.exports = {
    list,
    read,
    create
}