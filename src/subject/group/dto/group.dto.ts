import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"


export class GroupDTO {

    @IsNotEmpty()
    @IsString()
    @Length(1, 2)
    name!: string

    @IsBoolean()
    @IsOptional()
    active!: boolean

    @IsString()
    @IsNotEmpty()
    subject_code!: string

}