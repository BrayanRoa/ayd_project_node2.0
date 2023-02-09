import { DeleteResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

export class UserService extends BaseService<UserEntity>{
    
    constructor(){
        super(UserEntity)
    }

    async findAll(): Promise<UserEntity[] | undefined> {
        try {
            return (await this.execRepository).find()
        } catch (error) {
            console.log(error);
        }
    }

    async findById(id: string): Promise<UserEntity | undefined | null> {
        try {
            return (await this.execRepository).findOneBy({ id })
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(body: UserDTO): Promise<UserEntity | undefined> {
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

    async updateUser(id: string, infoUpdate: UserDTO) {
        try {
            return (await this.execRepository).update(id, infoUpdate)
        } catch (error) {
            console.log(error);
        }
    }
}