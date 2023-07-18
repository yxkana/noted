import express from "express"
import callRoute from "./calls.js"

const router = express.Router();

router.use("/call",callRoute);


export default router