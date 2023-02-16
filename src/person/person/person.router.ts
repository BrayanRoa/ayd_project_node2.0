import { PersonController } from './controller/person.controller';
import { BaseRouter } from '../../shared/router/router';
import { PersonMiddleware } from './middleware/person.middleware';

export class PersonRouter extends BaseRouter<PersonController, PersonMiddleware>{

    constructor() {
        super(PersonController, PersonMiddleware)
    }

    routes(): void {
        this.router.get(
            "/persons",
            (req, res) => this.controller.findAll(req, res)
        )

        this.router.get(
            "/person/:term",
            (req, res) => this.controller.findOneBy(req, res)
        )

        this.router.post(
            "/person/create",
            (req, res, next) => this.middleware.personValidator(req, res, next),
            (req, res) => this.controller.create(req, res)
        )

        this.router.patch(
            "/person/update/:id",
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res, next) => this.middleware.personValidator(req, res, next),
            (req, res) => this.controller.update(req, res)
        )

        this.router.delete(
            "/person/delete/:id",
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res) => this.controller.delete(req, res)
        )

        this.router.get('/person/teachers/all',
            (req, res) => this.controller.getAllTeachers(req, res)
        )

        this.router.get('/persons/group/:id',
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.getAllPersonOfGroup(req, res)
        )
    }
}