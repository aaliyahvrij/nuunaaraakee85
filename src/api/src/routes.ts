import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "./services/databaseService";

export const router: Router = Router();

// Endpoint om game objects op te halen
router.get("/gameobjects", asyncHandler(async (req: Request, res: Response) => {
    try {
        const connection: any = await getConnection();
        const query: string = "SELECT id, alias, name, description, type FROM gameobject";
        const gameObjects: any[] = await queryDatabase<any[]>(connection, query);
        res.json(gameObjects);
    } catch (error) {
        console.error("Error fetching game objects:", error);
        res.status(500).send("Error fetching game objects");
    }
}));

// Endpoint om een nieuw game object toe te voegen
router.post("/gameobject/add", asyncHandler(async (req: Request, res: Response) => {
    let connection: any;

    try {
        connection = await getConnection();
        await connection.beginTransaction(); // Begin transaction

        const { alias, name, description, type, price, hp }: { alias: string, name: string, description: string, type: string, price?: number, hp?: number } = req.body;
        const normalizedType: string = type.toLowerCase();

        // Controleren op vereiste velden
        if (!alias || !name || !description || !normalizedType) {
            res.status(400).send("Alias, name, description, and type are required.");
            return;
        }

        // Controleren op vereiste velden afhankelijk van het type
        if (normalizedType === "item" && price === undefined) {
            res.status(400).send("Price is required for an Item.");
            return;
        }

        if (normalizedType === "character" && hp === undefined) {
            res.status(400).send("HP is required for a Character.");
            return;
        }

        // Query voor het invoegen van een GameObject
        const gameObjectQuery: string = "INSERT INTO gameobject (alias, name, description, type) VALUES (?, ?, ?, ?)";
        const gameObjectValues: any[] = [alias, name, description, normalizedType];
        const gameObjectResult: ResultSetHeader = await queryDatabase<ResultSetHeader>(connection, gameObjectQuery, ...gameObjectValues);

        console.log("Inserted into gameobject table. Insert ID:", gameObjectResult.insertId);

        // Gebruik de gegenereerde id voor het invoegen van de gerelateerde record
        let specificGameObjectQuery: string;
        let specificGameObjectValues: any[];

        switch (normalizedType) {
            case "room":
                specificGameObjectQuery = "INSERT INTO room (id) VALUES (?)";
                specificGameObjectValues = [gameObjectResult.insertId];
                break;
            case "item":
                specificGameObjectQuery = "INSERT INTO item (id, price) VALUES (?, ?)";
                specificGameObjectValues = [gameObjectResult.insertId, price];
                break;
            case "character":
                specificGameObjectQuery = "INSERT INTO `character` (id, hp) VALUES (?, ?)";
                specificGameObjectValues = [gameObjectResult.insertId, hp];
                break;
            default:
                throw new Error("Unknown type");
        }

        // Log de query en de waarden
        console.log("Executing specific query:", specificGameObjectQuery, specificGameObjectValues);

        // Uitvoeren van de query voor het specifieke type GameObject
        await queryDatabase<ResultSetHeader>(connection, specificGameObjectQuery, ...specificGameObjectValues);

        // Commit transaction
        await connection.commit();

        res.status(204).send();
    } catch (error) {
        console.error("Error adding game object:", error);
        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackError) {
                console.error("Error during transaction rollback:", rollbackError);
            }
        }
        res.status(400).send("Error adding game object");
    } finally {
        if (connection) {
            await connection.release(); // Zorg ervoor dat de verbinding wordt vrijgegeven
        }
    }
}));

// Endpoint om een game object te verwijderen
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

router.get("/", (req, res) => {
    res.json({
        hello: "world",
    });
});

interface ResultSetHeader {
    insertId: number;
    affectedRows: number;
    changedRows: number;
    warningCount: number;
}

export default router;
//commit