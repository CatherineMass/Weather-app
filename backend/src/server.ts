import { app, router } from "./routes/routes";
import errorLogging from "./middlewares/errorLog";
import errorResponse from "./middlewares/errorResponse";
import dotenv from "dotenv";
dotenv.config();

app.use("/api/v1", router);
app.use(errorResponse);
app.use(errorLogging);

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.BACKEND_PORT}/api/v1...`);
});
