import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { Router } from "express";

export const router: Router = Router();

router.get("/", (_req, res) => {
    res.json({
        hello: "world",
    });
});




router.post("/gameobject/add", (req, res) => {
    const requestBody: GameObjectFormResult = req.body;
    const { alias, name, description, type, price, hp } = requestBody;
    console.log(requestBody,);
   

    if (!alias && !name && !description && !type){
        console.log("Not valid");
        res.sendStatus(400);
    }

    if (type === "item" && price === undefined) {
        console.log("Price is required for items");
        return res.sendStatus(400);
    }


    if (type === "character" && hp === undefined) {
        console.log("HP is required for characters");
        return res.sendStatus(400);
    }


    console.log(req.body); 
    return res.status(204).send(); 
});
