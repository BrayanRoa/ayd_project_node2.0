import { Column, Entity } from "typeorm"
import { BaseEntity } from "../../config/base.entity"

@Entity({name:"user"})
export class UserEntity extends BaseEntity {

    @Column({
        type:"varchar",
        nullable:false
    })
    name!:string

    @Column({
        type:"varchar",
        nullable:false
    })
    lastname!:string

    @Column({
        type:"varchar",
        nullable:false
    })
    email!:string

    @Column({
        type:"varchar",
        nullable:false
    })
    number_phone!:string
}