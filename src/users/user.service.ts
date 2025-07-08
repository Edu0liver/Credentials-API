import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly repository: UserRepository) {}

    async create(dto: CreateUserDto) {
        const existing = await this.repository.findByEmail(dto.email);

        if (existing) throw new BadRequestException('Email já cadastrado');

        const salt = await genSalt(16);
        dto.password = await hash(dto.password, salt);

        return await this.repository.create(dto);
    }

    async findAll() {
        return await this.repository.findAll();
    }

    async findOne(id: number) {
        const user = await this.repository.findById(id);

        if (!user) throw new NotFoundException('Usuário não encontrado');

        return user;
    }

    async findOneByEmail(email: string) {
        const user = await this.repository.findByEmail(email);

        if (!user) throw new NotFoundException('Usuário não encontrado');

        return user;
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.findOne(id);

        if (!user) throw new NotFoundException('Usuário não encontrado');

        return await this.repository.update(id, dto);
    }

    async remove(id: number) {
        const user = await this.findOne(id);

        if (!user) throw new NotFoundException('Usuário não encontrado');

        return await this.repository.delete(id);
    }
}
