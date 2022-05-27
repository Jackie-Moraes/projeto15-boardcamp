import { Router } from "express"

import { validateGame } from "../middlewares/validateGame.js"
import { getGames, postGames } from "../controllers/gamesController.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", validateGame, postGames)

export default gamesRouter
