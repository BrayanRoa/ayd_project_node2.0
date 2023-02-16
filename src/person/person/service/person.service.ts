import { BaseService } from '../../../config/base.service';
import { PersonEntity } from '../entity/person.entity';
import { PersonDTO } from '../dto/person.dto';
import { RoleService } from '../../role/service/role.service';
import { DocumentTypeService } from '../../document_type/service/document_type.service';
import { UpdatePersonDTO } from '../dto/update.person.dto';


export class PersonService extends BaseService<PersonEntity>{

    constructor(
        private readonly roleService: RoleService = new RoleService(),
        private readonly documentService: DocumentTypeService = new DocumentTypeService()
    ) {
        super(PersonEntity)
    }

    async findAll(): Promise<PersonEntity[] | undefined> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .leftJoin("person.document_type", "document")
                .leftJoin("person.role", "role")
                .select([
                    "person",
                    "document.name",
                    "role.name"
                ])
                .getMany()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async getAllTeachers(): Promise<PersonEntity[] | undefined> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .leftJoin("person.role","role")
                .where("role.name = :name", {name:"docente"})
                .getMany()
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async getAllPersonOfGroup(group_id:string) {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .leftJoin("person.groups", "group")
                .leftJoin("person.role","role")
                .where("group.group_id = :group_id" ,{group_id})
                .select(["person", "role.name"])
                .getMany()
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async findOneBy(term: string): Promise<PersonEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .leftJoin("person.role", "role")
                .leftJoin("person.document_type", "document")
                .where(
                    ` 
                    person.code = :term OR 
                    person.institutional_mail = :term`,
                    { term })
                .select([
                    "person",
                    "document.name",
                    "role.name"
                ])
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async create(person: PersonDTO): Promise<PersonEntity> {
        try {
            const document = await this.documentService.findById(person.document_id)
            const role = await this.roleService.findById(person.role_id)
            if (document && role) {
                const newPerson = (await this.execRepository).create(person)
                newPerson.role = role
                newPerson.document_type = document
                return (await this.execRepository).save(newPerson)
            } else {
                throw new Error(`verify id of document and role`)
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async update(id:string, body:UpdatePersonDTO) {
        try {
            return (await this.execRepository).update(id, body)
        } catch (error:any) {
            throw new Error(error)            
        }
    }

    async delete(id:string) {
        try {
            return (await this.execRepository).update(id,{active:false})        
        } catch (error:any) {
            throw new Error(error)       
        }
    }
}