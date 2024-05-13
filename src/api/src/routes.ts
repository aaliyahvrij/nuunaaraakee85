import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getConnection, queryDatabase } from "./services/databaseService";

export const router: Router = Router();

router.get("/gameobjects", asyncHandler(async (req: Request, res: Response) => {
    try {
        // Verbinding maken met de database
        const connection: any = await getConnection();

        // Query om alle GameObjects op te halen
        const query: string = "SELECT id, alias, name, description, type FROM gameobject";
        const gameObjects: any[] = await queryDatabase<any[]>(connection, query);

        // Response met de opgehaalde GameObjects
        res.json(gameObjects);
    } catch (error) {
        // Foutafhandeling
        console.error("Error fetching game objects:", error);
        res.status(500).send("Error fetching game objects");
    }
}));

router.post("/gameobject/add", asyncHandler(async (req: Request, res: Response) => {
    try {
        // Verbinding maken met de database
        const connection: any = await getConnection();

        // Uitpakken van de gegevens van het verzoek
        const { alias, name, description, type, price, hp }: { alias: string, name: string, description: string, type: string, price?: number, hp?: number } = req.body;

        // Normaliseer het type naar kleine letters
        const normalizedType:any = type.toLowerCase();

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
                specificGameObjectQuery = "INSERT INTO character (id, hp) VALUES (?, ?)";
                specificGameObjectValues = [gameObjectResult.insertId, hp];
                break;
            default:
                throw new Error("Unknown type");
        }
        
        // Uitvoeren van de query voor het specifieke type GameObject
        await queryDatabase<ResultSetHeader>(connection, specificGameObjectQuery, ...specificGameObjectValues);

        // Response verzenden
        res.status(204).send();
    } catch (error) {
        // Foutafhandeling
        console.error("Error adding game object:", error);
        res.status(400).send("Error adding game object");
    }
}));

// Endpoint om een GameObject te verwijderen
router.delete("/gameobject/:id/delete", asyncHandler(async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  try {
    // Verbinding maken met de database
    const connection: any = await getConnection();

    // Query om het GameObject te verwijderen
    const query: string = "DELETE FROM gameobject WHERE id = ?";
    await queryDatabase(connection, query, id);

    // Response verzenden
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting game object:", error);
    res.status(500).send("Error deleting game object");
  }
}));


router.get("/", (req, res) => {
    // Standaardroute voor testdoeleinden
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