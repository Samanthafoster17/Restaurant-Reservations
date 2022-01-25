/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:reservation_id")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

router
  .route("/:reservation_id/status")
  .get(controller.read)
  .put(controller.updateStatus)
  .all(methodNotAllowed);

module.exports = router;
