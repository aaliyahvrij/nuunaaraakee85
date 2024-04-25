import { Router } from "express";

export const router: Router = Router();

router.get("/", (req, res) => {
    res.json({
        hello: "world",
    });
});

router.post("/gameobject/add", (req, res) => {
    console.log(req.body);
    res.status(204).send();
});
