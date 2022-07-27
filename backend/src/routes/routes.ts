import { getData } from "./../controllers/controllers";
import express, { Application, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

export const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));

export const router: Router = express.Router();

router.route("/").get(getData);