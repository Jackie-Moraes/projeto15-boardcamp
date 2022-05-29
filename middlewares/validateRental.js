import rentalSchema from "./schemas/rentalSchema.js"
import connection from "../database.js"

export async function validateRental(req, res, next) {
    const validation = rentalSchema.validate(req.body)
    if (validation.error) {
        return res.sendStatus(400)
    }

    const { customerId, gameId } = req.body
    try {
        const findCustomer = await connection.query(
            `SELECT * FROM customers
            WHERE customers.id = $1
            `,
            [customerId]
        )
        if (!findCustomer.rows[0]) {
            return res.sendStatus(400)
        }

        const findGame = await connection.query(
            `SELECT * FROM games
            WHERE games.id = $1
            `,
            [gameId]
        )
        if (!findGame.rows[0] || findGame.rows[0].stockTotal == 0) {
            return res.sendStatus(400)
        }

        res.locals.game = findGame.rows[0]
        next()
    } catch (e) {
        res.status(500).send(e)
    }
}
