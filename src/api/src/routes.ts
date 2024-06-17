import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "./services/databaseService";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";

export const router: Router = Router();

router.get("/", (_req, res) => {
    res.json({ hello: "world" });
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

    if (type === "Character" && hp === undefined) {
        console.log("HP is required for characters");
        res.sendStatus(400);
    }

    try {
        const connection: PoolConnection = await getConnection();

        try {
            await connection.beginTransaction();

            const gameObjectResult: ResultSetHeader = await queryDatabase<ResultSetHeader>(
                connection,
                "INSERT INTO GameObject (alias, name, description) VALUES (?, ?, ?)",
                alias, name, description
            );

            const gameObjectId: number = gameObjectResult.insertId;

            if (type === "Item") {
                await queryDatabase<ResultSetHeader>(
                    connection,
                    "INSERT INTO Item (id, price) VALUES (?, ?)",
                    gameObjectId, price
                );
            } else if (type === "Character") {
                await queryDatabase<ResultSetHeader>(
                    connection,
                    "INSERT INTO `Character` (id, hp) VALUES (?, ?)",
                    gameObjectId, hp
                );
            } else if (type === "Room") {
                await queryDatabase<ResultSetHeader>(
                    connection,
                    "INSERT INTO Room (id) VALUES (?)",
                    gameObjectId
                );
            }

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

// New endpoint to get all GameObjects
router.get("/gameobjects", asyncHandler(async (_req, res) => {
    try {
        const connection: PoolConnection = await getConnection();
        try {
            const results = await queryDatabase<GameObjectFormResult[]>(connection, "SELECT * FROM GameObject");
            res.json(results);
        } catch (error) {
            console.error("Error fetching GameObjects:", error);
            res.status(500).send("Error fetching GameObjects");
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).send("Database connection error");
    }
}));
// Endpoint om een game object te bewerken
router.put("/gameobject/:id/edit", asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const { name, description, alias, type } = req.body;

    console.log(`Received edit request for game object with ID ${id}`);
    console.log("Request body:", req.body);

    try {
        const connection: any = await getConnection();

        // Log de waarden die naar de query worden gestuurd
        console.log(`Values: name = ${name}, description = ${description}, alias = ${alias}, type = ${type}, id = ${id}`);

        // Test de query zonder parameterbinding
        const testQuery: string = `UPDATE gameobject SET name = '${name}', description = '${description}', alias = '${alias}', type = '${type}' WHERE id = ${id}`;
        
        // Log de test query string
        console.log(`Executing test query: ${testQuery}`);
        
        const result: any = await queryDatabase(connection, testQuery);

        console.log("Test query result:", result);

        // Response verzenden
        res.status(200).send({ message: "Game object updated successfully" });
    } catch (error) {
        console.error("Error updating game object:", error);
        res.status(500).send(`Error updating game object: ${error.message}`);
    }
}));


// New endpoint to update a GameObject
router.put("/gameobject/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const requestBody: GameObjectFormResult = req.body;
    const { alias, name, description, type, price, hp } = requestBody;

    try {
        const connection: PoolConnection = await getConnection();
        try {
            await connection.beginTransaction();
            await queryDatabase(connection, "UPDATE GameObject SET alias = ?, name = ?, description = ? WHERE id = ?", [alias, name, description, id]);

            if (type === "Item") {
                await queryDatabase(connection, "UPDATE Item SET price = ? WHERE id = ?", [price, id]);
            } else if (type === "Character") {
                await queryDatabase(connection, "UPDATE `Character` SET hp = ? WHERE id = ?", [hp, id]);
            } else if (type === "Room") {
                // Room specific updates
            }

            await connection.commit();
            res.status(204).send();
        } catch (error) {
            await connection.rollback();
            console.error("Error updating GameObject:", error);
            res.status(500).send("Error updating GameObject");
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).send("Database connection error");
    }
}));
router.delete("/gameobject/:id/delete", asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    try {
        const connection: any = await getConnection();
        const query: string = "DELETE FROM gameobject WHERE id = ?";
        await queryDatabase(connection, query, [id]);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting game object:", error);
        res.status(500).send("Error deleting game object");
    }
}));


export default router;
