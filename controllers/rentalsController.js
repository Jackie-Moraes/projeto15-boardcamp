import connection from "../database.js"
import dayjs from "dayjs"

export async function getRentals(req, res) {
    const queryCustomerId = req.query.customerId
    const queryGameId = req.query.gameId

    try {
        if (queryCustomerId && queryGameId) {
            const searchResult = await connection.query(
                `SELECT rentals.*, 
                customers.id AS "singleCustomerId", customers.name AS "customerName", 
                games.id AS "singleGameId", games.name AS "gameName", games."categoryId",
                categories.name AS "categoryName"
                FROM rentals
                JOIN customers
                ON rentals."customerId" = customers.id
                JOIN games
                ON rentals."gameId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE ${queryCustomerId} = customers.id AND ${queryGameId} = games.id
                `
            )

            const result = searchResult.rows.map((row) => {
                const {
                    id,
                    customerId,
                    gameId,
                    rentDate,
                    daysRented,
                    returnDate,
                    originalPrice,
                    delayFee,
                    singleCustomerId,
                    customerName,
                    singleGameId,
                    gameName,
                    categoryId,
                    categoryName,
                } = row

                return {
                    id: id,
                    customerId: customerId,
                    gameId: gameId,
                    rentDate: rentDate,
                    daysRented: daysRented,
                    returnDate: returnDate,
                    originalPrice: originalPrice,
                    delayFee: delayFee,
                    customer: {
                        id: singleCustomerId,
                        name: customerName,
                    },
                    game: {
                        id: singleGameId,
                        name: gameName,
                        categoryId: categoryId,
                        categoryName: categoryName,
                    },
                }
            })

            return res.status(200).send(result)
        } else if (!queryCustomerId && queryGameId) {
            const searchResult = await connection.query(
                `SELECT rentals.*, 
                customers.id AS "singleCustomerId", customers.name AS "customerName", 
                games.id AS "singleGameId", games.name AS "gameName", games."categoryId",
                categories.name AS "categoryName"
                FROM rentals
                JOIN customers
                ON rentals."customerId" = customers.id
                JOIN games
                ON rentals."gameId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE ${queryGameId} = games.id
                `
            )

            const result = searchResult.rows.map((row) => {
                const {
                    id,
                    customerId,
                    gameId,
                    rentDate,
                    daysRented,
                    returnDate,
                    originalPrice,
                    delayFee,
                    singleCustomerId,
                    customerName,
                    singleGameId,
                    gameName,
                    categoryId,
                    categoryName,
                } = row

                return {
                    id: id,
                    customerId: customerId,
                    gameId: gameId,
                    rentDate: rentDate,
                    daysRented: daysRented,
                    returnDate: returnDate,
                    originalPrice: originalPrice,
                    delayFee: delayFee,
                    customer: {
                        id: singleCustomerId,
                        name: customerName,
                    },
                    game: {
                        id: singleGameId,
                        name: gameName,
                        categoryId: categoryId,
                        categoryName: categoryName,
                    },
                }
            })

            return res.status(200).send(result)
        } else if (queryCustomerId && !queryGameId) {
            const searchResult = await connection.query(
                `SELECT rentals.*, 
                customers.id AS "singleCustomerId", customers.name AS "customerName", 
                games.id AS "singleGameId", games.name AS "gameName", games."categoryId",
                categories.name AS "categoryName"
                FROM rentals
                JOIN customers
                ON rentals."customerId" = customers.id
                JOIN games
                ON rentals."gameId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE ${queryCustomerId} = customers.id
                `
            )

            const result = searchResult.rows.map((row) => {
                const {
                    id,
                    customerId,
                    gameId,
                    rentDate,
                    daysRented,
                    returnDate,
                    originalPrice,
                    delayFee,
                    singleCustomerId,
                    customerName,
                    singleGameId,
                    gameName,
                    categoryId,
                    categoryName,
                } = row

                return {
                    id: id,
                    customerId: customerId,
                    gameId: gameId,
                    rentDate: rentDate,
                    daysRented: daysRented,
                    returnDate: returnDate,
                    originalPrice: originalPrice,
                    delayFee: delayFee,
                    customer: {
                        id: singleCustomerId,
                        name: customerName,
                    },
                    game: {
                        id: singleGameId,
                        name: gameName,
                        categoryId: categoryId,
                        categoryName: categoryName,
                    },
                }
            })

            return res.status(200).send(result)
        } else {
            const searchResult = await connection.query(
                `SELECT rentals.*, 
                customers.id AS "singleCustomerId", customers.name AS "customerName", 
                games.id AS "singleGameId", games.name AS "gameName", games."categoryId",
                categories.name AS "categoryName"
                FROM rentals
                JOIN customers
                ON rentals."customerId" = customers.id
                JOIN games
                ON rentals."gameId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id
                `
            )

            const result = searchResult.rows.map((row) => {
                const {
                    id,
                    customerId,
                    gameId,
                    rentDate,
                    daysRented,
                    returnDate,
                    originalPrice,
                    delayFee,
                    singleCustomerId,
                    customerName,
                    singleGameId,
                    gameName,
                    categoryId,
                    categoryName,
                } = row

                return {
                    id: id,
                    customerId: customerId,
                    gameId: gameId,
                    rentDate: rentDate,
                    daysRented: daysRented,
                    returnDate: returnDate,
                    originalPrice: originalPrice,
                    delayFee: delayFee,
                    customer: {
                        id: singleCustomerId,
                        name: customerName,
                    },
                    game: {
                        id: singleGameId,
                        name: gameName,
                        categoryId: categoryId,
                        categoryName: categoryName,
                    },
                }
            })

            return res.status(200).send(result)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const { game } = res.locals
    try {
        const rentPrice = parseInt(game.pricePerDay) * daysRented
        const todayDate = dayjs().format("YYYY-MM-DD")

        const query = await connection.query(
            `INSERT INTO rentals 
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES
            (${customerId}, ${gameId}, '${todayDate}', ${daysRented}, null, ${rentPrice}, null)
            `
        )

        const updateAvailable = await connection.query(
            `UPDATE games
            SET "stockTotal" = "stockTotal" - 1
            WHERE id = $1
            `,
            [gameId]
        )

        res.sendStatus(201)
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function returnRent(req, res) {
    const { id } = req.params
    const { result } = res.locals
    try {
        const todayDate = dayjs()
        const boughtDate = dayjs(result.rows[0].rentDate)
        const timeDiff = todayDate.diff(boughtDate, "day")

        const priceFee = result.rows[0].originalPrice * timeDiff

        const update = await connection.query(
            `UPDATE rentals
            SET "returnDate" = '${todayDate}', "delayFee" = ${priceFee}
            WHERE id = $1
            `,
            [id]
        )

        const updateAvailable = await connection.query(
            `UPDATE games
            SET "stockTotal" = "stockTotal" + 1
            WHERE id = $1
            `,
            [result.rows[0].gameId]
        )

        res.sendStatus(200)
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function deleteRent(req, res) {
    const { id } = req.params
    const { result } = res.locals
    try {
        const updateAvailable = await connection.query(
            `UPDATE games
            SET "stockTotal" = "stockTotal" + 1
            WHERE id = $1
            `,
            [result.rows[0].gameId]
        )

        const removeRent = await connection.query(
            `DELETE FROM rentals
            WHERE id = ${id}
            `
        )

        res.sendStatus(200)
    } catch (e) {
        res.status(500).send(e)
    }
}
