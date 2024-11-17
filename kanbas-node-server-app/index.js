import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";


const app = express()
UserRoutes(app);
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express.json());
Lab5(app);
Hello(app)
app.listen(4000);