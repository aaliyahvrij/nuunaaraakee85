console.log("API");

import express, { Express } from "express";
import { config } from "dotenv";
import { router } from "./routes";
import cors from "cors";

export const app: Express = express();

config();
config({ path: ".env.local", override: true });

app.use(cors());
app.use(express.json());

app.use(router);

const port: number = (process.env.PORT || 8080) as number;

app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});
