const knex = require("../db/connection");

function list(reservation_date) {
    return knex("reservations")
    .select("*")
    .whereNot({ status: 'finished' })
    .andWhereNot({ status: 'cancelled' })
    .orderBy("reservation_time", "asc");
}

function read(reservation_id) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .then((reservation) => reservation[0]);
}

function create(newReservation){
 return knex("reservations")
 .insert({
     ...newReservation,
    'status': 'booked',
})
 .returning("*")
 .then((newReservation) => newReservation[0]);
}

function updateStatus(updRes) {
    return knex('reservations')
    .select('*')
    .where({ reservation_id: updRes.reservation_id })
    .update({ status: updRes.status })
    .returning("*")
}

module.exports = {
    list,
    read,
    create,
    updateStatus
}