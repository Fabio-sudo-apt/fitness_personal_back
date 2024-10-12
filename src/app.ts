import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import patient from "./routes/patientRoutes";

class App {
    private app: express.Application;

    constructor() {
        this.app = this.init();
        this.configureDotenv();
        this.middlewares();
        this.routes();
    }

    init(): express.Application {
        return express();
    }

    routes(): void {
        this.app.use("/api/v1", patient);
    }

    configureDotenv(): void {
        dotenv.config();
    }

    middlewares(): void {
        this.app.use(express.json());
        this.app.use(morgan("dev"));
    }

    listen(port: number | string): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

export default new App;