import connection from "../database.js"

export async function getGames(req, res) {
    const { name } = req.query
    try {
        if (!name) {
            const result = await connection.query(
                `SELECT games.*, categories.name AS "categoryName"
                FROM games
                JOIN categories
                ON games."categoryId" = categories.id`
            )
            res.status(200).send(result.rows)
        } else {
            const result = await connection.query(
                `SELECT games.*, categories.name AS "categoryName"
                FROM games
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE games.name ILIKE $1
                `,
                [`${name}%`]
            )
            res.status(200).send(result.rows)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body
    try {
        const query = await connection.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ('${name}', '${image}', ${stockTotal}, ${categoryId}, ${pricePerDay})`
        )
        return res.sendStatus(201)
    } catch (e) {
        res.status(500).send(e)
    }
}
