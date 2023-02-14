import { BaseEntity } from '../../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SubjectEntity } from '../../subject/entity/subject.entity';

@Entity({name:"group"})
export class GroupEntity extends BaseEntity{

    @Column({
        type:"varchar",
        length:2,
        nullable:false
    })
    name!:string

    @Column({
        type:"boolean",
        default:true
    })
    active!:boolean

    @ManyToOne(() => SubjectEntity, (subject) => subject.group)
    @JoinColumn({name:"subject_code"})
    subject!:SubjectEntity
}