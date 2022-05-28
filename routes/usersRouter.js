import { Router } from "express"

import { validateUser } from "../middlewares/validateUser.js"
import { validateUpdate } from "../middlewares/validateUpdate.js"
import {
    getAllCostumers,
    getCostumerById,
    postUsers,
    updateUser,
} from "../controllers/customersController.js"

const usersRouter = Router()

usersRouter.get("/customers", getAllCostumers)
usersRouter.get("/customers/:id", getCostumerById)
usersRouter.post("/customers", validateUser, postUsers)
usersRouter.put("/customers/:id", validateUpdate, updateUser)

export default usersRouter
