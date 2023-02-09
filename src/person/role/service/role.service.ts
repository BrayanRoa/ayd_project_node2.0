import { DeleteResult } from 'typeorm';
import { BaseService } from '../../../config/base.service';
import { RoleDTO } from '../dto/role.dto';
import { RoleEntity } from '../entity/role.entity';

export class RoleService extends BaseService<RoleEntity>{
    
    constructor(){
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
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(body: RoleDTO): Promise<RoleEntity | undefined> {
        try {
            return (await this.execRepository).save(body)
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(id: string): Promise<DeleteResult | undefined> {
        try {
            return (await this.execRepository).delete(id)
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(id: string, infoUpdate: RoleDTO) {
        try {
            return (await this.execRepository).update(id, infoUpdate)
        } catch (error) {
            console.log(error);
        }
    }
}