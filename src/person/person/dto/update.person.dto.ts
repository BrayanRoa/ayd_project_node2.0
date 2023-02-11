import { IsEmail, IsOptional, IsString } from "class-validator"


export class UpdatePersonDTO{

    @IsEmail()
    @IsOptional()
    @IsString()
    institutional_mail?:string

    @IsOptional()
    @IsString()
    names?:string

    @IsOptional()
    @IsString()
    lastnames?:string

    @IsOptional()
    @IsString()
    code?:string

    @IsOptional()
    @IsString()
    img?:string

}