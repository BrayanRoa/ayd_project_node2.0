import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDTO } from '../../../config/base.dto';

export class RoleDTO extends BaseDTO{

    @IsString()
    @IsNotEmpty()    
    name!:string
    
    @IsBoolean()
    @IsOptional()
    state?:boolean
}