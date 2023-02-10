import { DeleteResult } from 'typeorm';
import { BaseService } from '../../../config/base.service';
import { RoleDTO } from '../dto/role.dto';
import { RoleEntity } from '../entity/role.entity';

export class RoleService extends BaseService<RoleEntity>{

    constructor() {
        super(RoleEntity)
    }

    async findAll(): Promise<RoleEntity[] | undefined> {
        try {
            return (await this.execRepository).find()
        } catch (error) {
            console.log(error);
        }
    }

    async findById(id: string): Promise<RoleEntity | undefined | null> {
        try {
            return (await this.execRepository).findOneBy({ id })
        } catch (error: any) {
            console.log(error);
            throw new Error(error)
        }
    }

    async create(body: RoleDTO): Promise<RoleEntity | undefined> {
        try {
            return (await this.execRepository).save(body)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async delete(id: string): Promise<DeleteResult | undefined> {
        try {
            return (await this.execRepository).update(id, {state:false})
        } catch (error) {
            console.log(error);
        }
    }

    async update(id: string, name: string) {
        try {
            return (await this.execRepository).update(id, { name })
        } catch (error) {
            console.log(error);
        }
    }
}