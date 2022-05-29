import { Router } from "express"

import { validateRental } from "../middlewares/validateRental.js"
import { validateFinishRental } from "../middlewares/validateFinishRental.js"
import {
    deleteRent,
    getRentals,
    postRentals,
    returnRent,
} from "../controllers/rentalsController.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateRental, postRentals)
rentalsRouter.post("/rentals/:id/return", validateFinishRental, returnRent)
rentalsRouter.delete("/rentals/:id", validateFinishRental, deleteRent)

export default rentalsRouter
