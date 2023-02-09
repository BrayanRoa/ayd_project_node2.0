import { Request, Response, NextFunction } from "express";
import { validate as uuidValid } from "uuid"
import { HttpResponse } from '../response/http-response';

export class SharedMiddleware {

    public readonly httpResponse: HttpResponse;

    constructor() {
        this.httpResponse = new HttpResponse()
    }

    async uuidValidator(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        if (!uuidValid(id)) {
            return this.httpResponse.BadRequest(res, `the id "${id}" is not valid`)
        }
        next()
    }
}