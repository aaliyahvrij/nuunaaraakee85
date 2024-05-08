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
    console.log(requestBody);

    if (requestBody.alias && requestBody.name && requestBody.description){
        console.log("Valide");
        res.sendStatus(200);
    } else {
        console.log("niet valide");
        res.sendStatus(400);
    }






    console.log(req.body); 
    return res.status(204).send(); 
});
