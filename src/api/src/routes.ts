import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "./services/databaseService"; 
import { PoolConnection, ResultSetHeader } from "mysql2/promise"; 

export const router: Router = Router();

router.get("/", (_req, res) => {
    res.json({
        hello: "world",
    });
});

router.post("/gameobject/add", asyncHandler(async (req, res) => {
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
        // Open een verbinding met de database
        const connection: PoolConnection = await getConnection();

        try {
            // Begin transaction
            await connection.beginTransaction();

            // Sla het GameObject op in de database
            const gameObjectResult: ResultSetHeader = await queryDatabase<ResultSetHeader>(
                connection,
                "INSERT INTO GameObject (alias, name, description) VALUES (?, ?, ?)",
                alias, name, description
            );

            const gameObjectId: number = gameObjectResult.insertId;

        
            if (type === "item") {
                await queryDatabase<ResultSetHeader>(
                    connection,
                    "INSERT INTO Item (id, price) VALUES (?, ?)",
                    gameObjectId, price
                );
            } else if (type === "character") {
                await queryDatabase<ResultSetHeader>(
                    connection,
                    "INSERT INTO `Character` (id, hp) VALUES (?, ?)",
                    gameObjectId, hp
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
}));



router.get("/gameobjects", asyncHandler(async (_req, res) => {
    try {
        const connection: PoolConnection = await getConnection();
        const rows: GameObjectFormResult [] = await queryDatabase(
            connection, 
            `
            SELECT 
              g.*, 
              i.price, 
              c.hp 
            FROM 
              GameObject g
            LEFT JOIN 
              Item i ON g.id = i.id
            LEFT JOIN 
              \`Character\` c ON g.id = c.id
          `
          );
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error("Error fetching game objects:", error);
        res.status(500).send("Error fetching game objects");
    }
}));






router.delete("/gameobjects/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const connection: PoolConnection = await getConnection();
        await connection.beginTransaction();

        const deleteResult: ResultSetHeader = await queryDatabase<ResultSetHeader>(
            connection,
            "DELETE FROM GameObject WHERE id = ?",
            [id]
        );

        if (deleteResult.affectedRows === 0) {
            console.error(`GameObject with id ${id} not found`);
            res.status(404).send("GameObject not found");
            return;
        }

        await connection.commit();
        res.status(204).send();
    } catch (error) {
        console.error("Transaction error:", error);
        await getConnection.rollback();
        res.status(500).send("Error occurred during transaction");
    } finally {
        getConnection.release();
    }
}));
 










router.put("/gameobjects/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { alias, name, description, type, price, hp }: GameObjectFormResult = req.body;

    if (!alias || !name || !description || !type) {
        res.status(400).send("Invalid input");
        return;
    }

    let connection: PoolConnection | null = null;

    try {
        connection = await getConnection();
        await connection.beginTransaction();

        await queryDatabase<ResultSetHeader>(
            connection,
            "UPDATE GameObject SET alias = ?, name = ?, description = ?, type = ? WHERE id = ?",
            [alias, name, description, type, id]
        );

        if (type === "item" && price !== undefined) {
            await queryDatabase<ResultSetHeader>(
                connection,
                "REPLACE INTO Item (id, price) VALUES (?, ?)",
                [id, price]
            );
        } else if (type === "character" && hp !== undefined) {
            await queryDatabase<ResultSetHeader>(
                connection,
                "REPLACE INTO `Character` (id, hp) VALUES (?, ?)",
                [id, hp]
            );
        }

        await connection.commit();
        res.status(200).send("GameObject updated successfully");
    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Transaction error:", error);
        res.status(500).send("Error occurred during transaction");
    } finally {
        if (connection) connection.release();
    }
}));