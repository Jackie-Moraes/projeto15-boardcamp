import connection from "../database.js"

export async function getAllCostumers(req, res) {
    const { cpf } = req.query
    try {
        if (!cpf) {
            const result = await connection.query(`SELECT * FROM customers`)
            res.status(200).send(result.rows)
        } else {
            const result = await connection.query(
                `SELECT * 
                FROM customers
                WHERE customers.cpf LIKE $1
                `,
                [`${cpf}%`]
            )
            res.status(200).send(result.rows)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function getCostumerById(req, res) {
    const { id } = req.params
    try {
        const result = await connection.query(
            `SELECT * FROM customers
            WHERE customers.id = $1
            `,
            [id]
        )

        if (!result.rows[0]) return res.sendStatus(404)

        res.status(200).send(result.rows)
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function postUsers(req, res) {
    const { name, phone, cpf, birthday } = req.body
    try {
        const query = await connection.query(
            `INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')
            `
        )
        res.sendStatus(201)
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function updateUser(req, res) {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params
    try {
        const query = await connection.query(
            `UPDATE customers 
            SET name = '${name}', phone = '${phone}', cpf = '${cpf}', birthday = '${birthday}'
            WHERE id = ${id}
            `
        )
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}
