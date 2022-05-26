import categorySchema from "./schemas/categorySchema.js"
import connection from "../database.js"

export async function validateCategory(req, res, next) {
    const validation = categorySchema.validate(req.body)
    if (validation.error) {
        return res.sendStatus(400)
    }

    try {
        const check = await connection.query(
            "SELECT * FROM categories WHERE name= $1",
            [req.body.name]
        )
        if (check.rows.length > 0) {
            return res.sendStatus(409)
        }
    } catch (e) {
        res.status(500).send(e)
    }

    next()
}
