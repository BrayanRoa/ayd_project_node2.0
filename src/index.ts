import express, { Application } from 'express'
import cors from "cors"
import morgan from "morgan"
import swaggerUi from 'swagger-ui-express';
import { ConfigServer } from "./config/config"
import { RoleRouter } from './person/role/role.router';
import { DocumentTypeRouter } from './person/document_type/document_type.router';
import { PersonRouter } from './person/person/person.router';
import { SubjectRouter } from './subject/subject/subject.router';
import { GroupRouter } from './subject/group/group.router';
import { GroupPersonRouter } from './subject/group_person/group_person.router';


class Server extends ConfigServer {
    private readonly app: Application
    private readonly PORT: number

    constructor() {
        super()
        this.app = express()
        this.PORT = this.getNumberEnv("PORT") || 3000
        this.middlewares()
        this.db()
        this.app.use("/api/", this.routers())
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swagger()));
        this.listen()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use(morgan("dev"))
    }

    routers(): express.Router[] {
        return [
            new RoleRouter().router,
            new DocumentTypeRouter().router,
            new PersonRouter().router,
            new SubjectRouter().router,
            new GroupRouter().router,
            new GroupPersonRouter().router
        ]
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port: ${this.PORT} - http://localhost:${this.PORT}`);
        })
    }
}

new Server()