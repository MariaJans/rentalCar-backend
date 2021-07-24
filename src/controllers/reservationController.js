const Reservation = require("../models/reservation");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// create a new reservation

exports.newReservation = catchAsyncErrors(async (req, res, next) => {
  const {
    reservationItems,
    itemsPrice,
    totalPrice,
    startTime,
    endTime,
    withDriver,
  } = req.body;
  const reservation = await Reservation.create({
    reservationItems,
    itemsPrice,
    totalPrice,
    startTime,
    endTime,
    withDriver,
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    reservation,
  });
});

//get single reservation

exports.getSingleReservation = catchAsyncErrors(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!reservation) {
    return next(new ErrorHandler("No Reservation found with this ID"), 400);
  }
  res.status(200).json({
    success: true,
    reservation,
  });
});

//get logged in user reservation

exports.myReservations = catchAsyncErrors(async (req, res, next) => {
  const reservations = await Reservation.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    reservations,
  });
});

// get all reservations admin

exports.allReservations = catchAsyncErrors(async (req, res, next) => {
  const reservations = await Reservation.find();
  let totalAmmount = 0;
  reservations.forEach((reservation) => {
    totalAmmount += reservation.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmmount,
    reservations,
  });
});

// update/process reservations admin

exports.updateReservation = catchAsyncErrors(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id);
  if (reservation.reservationStatus === "Accepted") {
    return next(new ErrorHandler("You have already accepted this order", 400));
  }

  reservation.reservationItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  (reservation.reservationStatus = req.body.status),
    (reservation.acceptedAt = Date.now());

  await reservation.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

//delete reservation

exports.deleteReservation = catchAsyncErrors(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    return next(new ErrorHandler("No Reservation found with this ID"), 400);
  }
  await reservation.remove();
  res.status(200).json({
    success: true,
  });
});
