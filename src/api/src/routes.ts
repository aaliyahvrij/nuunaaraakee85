import { Router, Request, Response } from "express";

export const router: Router = Router();

// GET /
router.get("/", (_req, res) => {
    res.json({
        hello: "world",
    });
});

// POST /gameobject/add
router.post("/gameobject/add", (req: Request, res: Response) => {
    // Voer de validatie uit
    const validationResult = validateGameObject(req.body);

    // Als er fouten zijn in de validatie, reageer met een 400-statuscode
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }

    // Log de ontvangen gegevens
    console.log("Received data:", req.body);

    // Reageer met een 204-statuscode om aan te geven dat de aanvraag is gelukt
    return res.status(204).send();
});

// Functie voor het valideren van game object data
function validateGameObject(data: any) {
    const Joi = require("joi");

    const schema = Joi.object({
        alias: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().valid("Item", "Room", "Character").required(),
        price: Joi.number().when("type", { is: "Item", then: Joi.required() }),
        hp: Joi.number().when("type", { is: "Character", then: Joi.required() })
    });

    return schema.validate(data);
}
