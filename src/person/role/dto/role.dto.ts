import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../config/base.dto';

export class RoleDTO extends BaseDTO{

    @IsString()
    @IsNotEmpty()    
    name!:string
    
    @IsBoolean()
    state?:boolean
}