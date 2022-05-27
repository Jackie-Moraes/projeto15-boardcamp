import gameSchema from "./schemas/gameSchema.js"
import connection from "../database.js"

export async function validateGame(req, res, next) {
    const validation = gameSchema.validate(req.body)
    if (validation.error) {
        return res.sendStatus(400)
    }

    try {
        const checkIfRepeated = await connection.query(
            "SELECT * FROM games WHERE name= $1",
            [req.body.name]
        )
        if (checkIfRepeated.rows[0]) {
            return res.sendStatus(409)
        }

        const checkCategory = await connection.query(
            "SELECT * FROM categories WHERE id= $1",
            [req.body.categoryId]
        )

        if (!checkCategory.rows[0]) {
            console.log(checkCategory.rows)
            return res.sendStatus(400)
        }
    } catch (e) {
        return res.status(500).send(e)
    }

    next()
}
