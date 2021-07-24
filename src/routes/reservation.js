const express = require("express");
const router = express.Router();

const {
  newReservation,
  getSingleReservation,
  myReservations,
  allReservations,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");
const { authorizeRoles, isAuthenticatedUser } = require("../middlewares/auth");

router.route("/reservation/new").post(isAuthenticatedUser, newReservation);
router.route("/reservation/:id").get(isAuthenticatedUser, getSingleReservation);
router.route("/reservations/me").get(isAuthenticatedUser, myReservations);
router
  .route("/admin/reservations")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allReservations);

module.exports = router;
router
  .route("/admin/reservation/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateReservation)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReservation);

module.exports = router;
