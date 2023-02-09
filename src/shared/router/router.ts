import { Router } from "express"

export class BaseRouter<T>{

    public readonly router: Router
    public readonly controller: T

    constructor(TController: { new(): T }) {
        this.router = Router()
        this.controller = new TController()
        this.routes()
    }

    routes() { }
}