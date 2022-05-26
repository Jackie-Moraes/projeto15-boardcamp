import connection from "../database.js"

export async function getCategories(req, res) {
    try {
        const result = await connection.query("SELECT * FROM categories")
        res.status(200).send(result.rows)
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function postCategory(req, res) {
    const { name } = req.body
    try {
        const query = await connection.query(
            `INSERT INTO categories (name) VALUES ('${name}')`
        )
        return res.sendStatus(201)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}
