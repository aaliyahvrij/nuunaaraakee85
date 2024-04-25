import { Router } from "express";

export const router: Router = Router();

router.get("/", (_req, res) => {
    res.json({
        hello: "world",
    });
});




router.post("/gameobject/add", (req, res) => {
    const { alias, name, description, type, price, hp } = (req.body);

     if (req.body.alias &&  )

    console.log(req.body); 
    return res.status(204).send(); 
});
