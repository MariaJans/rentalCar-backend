import express from "express";
const router = express.Router();
import signUpCopy from "../models/SignUpModels";

router.post("/signup", (request, response) => {
    const signedUpUser = new signUpCopy({
        fullName: request.query.fullName,
        username: request.query.username,
        email: request.query.email,
        password: request.query.password,
        phonenumber: request.query.phonenumber,
        driverlisence: request.query.driverlisence,
        age: request.query.age,
    })
    signedUpUser.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})
module.exports = router;