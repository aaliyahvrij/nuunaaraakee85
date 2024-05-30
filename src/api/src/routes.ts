import { Router } from "express";
import { GameObjectFormResult } from "/School/nuunaaraakee85/src/web/src/shared/GameObjectFormResult";
export const router: Router = Router();

router.get("/", (req, res) => {
    res.json({
        hello: "world",
    });
});

router.post("/gameobject/add", (req, res) => {
    const requestBody: GameObjectFormResult = req.body;
    const { alias, name, description, type, price, hp } = requestBody;
    console.log(requestBody);

    if (alias && name && description && type) {
        res.status(204).send();
    } else {
        res.status(400).send();
    }

    if (type === "item" && price) {
        res.status(204).send();
    } else {
        res.status(400).send();
    }

    if (type === "character" && hp) {
        res.status(204).send();
    } else {
        res.status(400).send();
    }
});
