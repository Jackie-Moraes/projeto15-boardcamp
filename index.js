import express from "express"
import cors from "cors"
import chalk from "chalk"
import joi from "joi"
import dotenv from "dotenv"
dotenv.config()

import categoriesRouter from "./routes/categoriesRouter.js"
import gamesRouter from "./routes/gamesRouter.js"
import usersRouter from "./routes/usersRouter.js"

const app = express()
app.use(cors())
app.use(express.json())

// Routers
app.use(categoriesRouter)
app.use(gamesRouter)
app.use(usersRouter)

app.listen(process.env.PORT || 4000, () =>
    console.log(
        chalk.blue.bold(`Server running on port ${process.env.PORT || 4000}`)
    )
)
