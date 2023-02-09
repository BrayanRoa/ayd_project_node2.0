
import { BaseRouter } from '../../shared/router/router';
import { RoleController } from './controller/role.controller';

export class RoleRouter extends BaseRouter<RoleController>{
    constructor(){
        super(RoleController)
    }

    
}