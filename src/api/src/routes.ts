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
                    "INSERT INTO Character (id, hp) VALUES (?, ?)",
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
