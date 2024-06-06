import { Router } from "express";
import { GameObjectFormResult } from "/School/nuunaaraakee85/src/web/src/shared/GameObjectFormResult";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "./services/databaseService";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";

export const router: Router = Router();

router.post(
    "/gameobject/add",
    asyncHandler(async (req, res) => {
        const requestBody: GameObjectFormResult = req.body;
        const { alias, name, description, type, price, hp } = requestBody;
        console.log(requestBody);

        if (!alias && !name && !description && !type) {
            console.log("Not valid");
            res.sendStatus(400);
        }

        if (type === "item" && price === undefined) {
            console.log("Price is required for items");
            res.sendStatus(400);
        }

        if (type === "character" && hp === undefined) {
            console.log("HP is required for characters");
            res.sendStatus(400);
        }

        try {
            // Connect to database
            const connection: PoolConnection = await getConnection();

            try {
                // Begin transaction
                await connection.beginTransaction();

                const gameObjectResult: ResultSetHeader = await queryDatabase<ResultSetHeader>(
                    connection,
                    "INSERT INTO GameObject (alias, name, description) VALUES (?, ?, ?)",
                    alias,
                    name,
                    description
                );

                const gameObjectId: number = gameObjectResult.insertId;

                if (type === "item") {
                    await queryDatabase<ResultSetHeader>(
                        connection,
                        "INSERT INTO Item (id, price) VALUES (?, ?)",
                        gameObjectId,
                        price
                    );
                } else if (type === "character") {
                    await queryDatabase<ResultSetHeader>(
                        connection,
                        "INSERT INTO `Character` (id, hp) VALUES (?, ?)",
                        gameObjectId,
                        hp
                    );
                } else if (type === "room") {
                    await queryDatabase<ResultSetHeader>(
                        connection,
                        "INSERT INTO Room (id) VALUES (?)",
                        gameObjectId
                    );
                }

                // Commit transaction
                await connection.commit();

                console.log("GameObject successfully added");
                res.status(204).send();
            } catch (error) {
                // Rollback transaction
                await connection.rollback();
                console.error("Transaction error:", error);
                res.status(400).send("Error occurred during transaction");
            } finally {
                // Release the connection
                connection.release();
            }
        } catch (error) {
            console.error("Database connection error:", error);
            res.status(400).send("Database connection error");
        }
    })
);

router.get(
    "/gameobjects",
    asyncHandler(async (_req, res) => {
        try {
            const connection: PoolConnection = await getConnection();
            const rows: GameObjectFormResult[] = await queryDatabase(connection, "SELECT * FROM GameObject");
            connection.release();
            res.json(rows);
        } catch (error) {
            console.error("Error fetching game objects:", error);
            res.status(500).send("Error fetching game objects");
        }
    })
);

router.put(
    "/gameobject/edit/:id",
    asyncHandler(async (req, res) => {
        const gameObjectId: number = parseInt(req.params.id);
        const requestBody: GameObjectFormResult = req.body;
        const { alias, name, description, type, price, hp } = requestBody;

        try {
            // Connect to database
            const connection: PoolConnection = await getConnection();

            try {
                // Begin transaction
                await connection.beginTransaction();

                await queryDatabase<ResultSetHeader>(
                    connection,
                    "UPDATE GameObject SET alias = ?, name = ?, description = ? WHERE id = ?",
                    alias,
                    name,
                    description,
                    gameObjectId
                );

                if (type === "item") {
                    await queryDatabase<ResultSetHeader>(
                        connection,
                        "UPDATE Item SET price = ? WHERE id = ?",
                        price,
                        gameObjectId
                    );
                } else if (type === "character") {
                    await queryDatabase<ResultSetHeader>(
                        connection,
                        "UPDATE `Character` SET hp = ? WHERE id = ?",
                        hp,
                        gameObjectId
                    );
                }

                // Commit transaction
                await connection.commit();

                console.log("GameObject successfully updated");
                res.status(204).send();
            } catch (error) {
                // Rollback transaction
                await connection.rollback();
                console.error("Transaction error:", error);
                res.status(400).send("Error occurred during transaction");
            } finally {
                // Release the connection
                connection.release();
            }
        } catch (error) {
            console.error("Database connection error:", error);
            res.status(400).send("Database connection error");
        }
    })
);

router.delete(
    "/gameobject/delete/:id",
    asyncHandler(async (req, res) => {
        const id: number = parseInt(req.params.id);

        try {
            const connection: any = await getConnection();
            const query: string = "DELETE FROM GameObject WHERE id = ?";
            await queryDatabase(connection, query, id);
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting game object:", error);
            res.status(500).send("Error deleting game object");
        }
    })
);
