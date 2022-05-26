import express from "express"
import cors from "cors"
import chalk from "chalk"

import database from "./database.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Online")
})

app.listen(process.env.PORT || 4000, () =>
    console.log(
        chalk.blue.bold(`Server running on port ${process.env.PORT || 4000}`)
    )
)
