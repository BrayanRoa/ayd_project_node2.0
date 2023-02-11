import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator"


export class PersonDTO{

    
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    institutional_mail!:string

    @IsString()
    @IsNotEmpty()
    names!:string

    @IsString()
    @IsNotEmpty()
    lastnames!:string

    @IsString()
    @IsNotEmpty()
    @Length(7, 8)
    code!:string

    @IsOptional()
    @IsString()
    img?:string

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    role_id!:string

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    document_id!:string
}