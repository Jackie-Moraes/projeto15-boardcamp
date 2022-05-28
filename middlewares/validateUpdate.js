import userSchema from "./schemas/userSchema.js"
import connection from "../database.js"

export async function validateUpdate(req, res, next) {
    const { id } = req.params
    const validation = userSchema.validate(req.body)
    if (validation.error) {
        return res.sendStatus(400)
    }

    try {
        const cpfCheck = await connection.query(
            "SELECT * FROM customers WHERE cpf = $1",
            [req.body.cpf]
        )

        const user = cpfCheck.rows[0]

        if (user && user.id != id) {
            return res.sendStatus(409)
        }
    } catch (e) {
        return res.status(500).send(e)
    }

    next()
}
