import { Router, Request, Response } from "express";

export const router: Router = Router();

router.post("/gameobject/add", (req: Request, res: Response) => {
    console.log("Received request body:", req.body);

    const { alias, name, description, type, price, hp } = req.body;

    if (!alias || !name || !description || !type) {
        res.status(400).send("Alias, name, description, and type are required.");
        return;
    }

    if (type === "Item" && price === undefined) {
        res.status(400).send("Price is required for an Item.");
        return;
    }

    if (type === "Character" && hp === undefined) {
        res.status(400).send("HP is required for a Character.");
        return;
    }

    console.log("Received data:", req.body);
    res.status(204).send();
});


router.get("/", (req, res) => {
    res.json({
        hello: "world",
    });
});
