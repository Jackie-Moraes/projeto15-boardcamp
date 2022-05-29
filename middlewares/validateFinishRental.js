import connection from "../database.js"

export async function validateFinishRental(req, res, next) {
    const { id } = req.params
    try {
        const result = await connection.query(
            `SELECT * FROM rentals
            WHERE id = ${id}
            `
        )

        if (!result.rows[0]) return res.sendStatus(404)
        if (result.rows[0].returnDate) return res.sendStatus(400)

        res.locals.result = result
    } catch (e) {
        return res.status(500).send(e)
    }

    next()
}
