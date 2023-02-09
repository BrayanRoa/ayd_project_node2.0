import { Request, Response } from "express";
import { UserService } from '../service/user.service';
import { HttpResponse } from '../../shared/response/http-response';

export class UserController {

    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getUsers(_req: Request, res: Response) {
        try {
            const users = await this.userService.findAll();
            (!users) 
                ? this.httpResponse.NotFound(res, "no people registered yet")
                : this.httpResponse.Ok(res, users)
        } catch (e) {
            this.httpResponse.Error(res, e)
        }
    }
}