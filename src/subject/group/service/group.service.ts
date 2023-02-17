import { BaseService } from '../../../config/base.service';
import { GroupEntity } from '../entity/group.entity';
import { GroupDTO } from '../dto/group.dto';
import { UpdateGroupDTO } from '../dto/update.dto';
import { SubjectService } from '../../subject/service/subject.service';

export class GroupService extends BaseService<GroupEntity>{

    constructor(
        private readonly subjectService: SubjectService = new SubjectService(),
    ) {
        super(GroupEntity)
    }

    async findAll(): Promise<GroupEntity[] | undefined> {
        try {
            return (await this.execRepository).find()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findOneBy(id: string): Promise<GroupEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("group")
                .leftJoin("group.subject", "subject")
                .where("group.id = :id", { id })
                .select(["group.id", "group.name", "subject.name", "subject.code"])
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async create(body: GroupDTO) {
        try {
            const subject = await this.subjectService.findOneBy(body.subject_code)
            const exist = await this.exist(body.name, body.subject_code)
            if (subject && !exist) {
                const newGroup = (await this.execRepository).create(body)
                newGroup.subject = subject
                return (await this.execRepository).save(newGroup)
            } else {
                throw new Error(`subject with id ${body.subject_code} not found or group already exist`)
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async update(id: string, body: UpdateGroupDTO) {
        try {
            return (await this.execRepository).update(id, body)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async delete(id: string) {
        try {
            return (await this.execRepository).update(id, { active: false })
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async seeGroupTasks(id: string): Promise<GroupEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("group")
                .leftJoin("group.task", "task")
                .where("group.id =:id", { id })
                .select(["group.name", "group.active", "task"])
                .getOne()
        } catch (error: any) {
            throw error.message
        }
    }

    async seeGroupProjects(id:string): Promise<GroupEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("group")
                .leftJoin("group.project", "project")
                .where("group.id =:id", { id })
                .select(["group.name", "group.active", "project"])
                .getOne()
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async exist(name: string, code: string): Promise<GroupEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("group")
                .where("group.name = :name AND group.subject_code = :code", { name, code })
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }
}