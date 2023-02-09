import { PersonController } from './controller/person.controller';
import { BaseRouter } from '../../shared/router/router';

export class PersonRouter extends BaseRouter<PersonController>{

    constructor(){
        super(PersonController)
    }

    routes(): void {
        // this.router.get()
    }
}