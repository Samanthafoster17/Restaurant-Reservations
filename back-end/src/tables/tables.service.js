const knex = require("../db/connection");


function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name");
}

function read(table_id) {
    return knex("tables")
    .select("*")
    .where({ table_id })
    .then((table) => table[0]);
}


function create(table) {
 return knex("tables")
 .insert(table)
 .returning("*")
}

function update({ table_id, reservation_id }) {
    return knex.transaction((trx) => {
      return knex('reservations')
        .transacting(trx)
        .where({ reservation_id: reservation_id })
        .then(() => {
          return knex('tables')
            .where({ table_id: table_id })
            .update({ reservation_id: reservation_id })
            .update({ status: 'Occupied' })
            .returning('*');
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }

module.exports = {
    list,
    read,
    create,
    update
}