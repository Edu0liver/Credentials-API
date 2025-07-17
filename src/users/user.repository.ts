import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findByResetToken(token: string) {
        return await this.prisma.user.findFirst({
            where: {
                reset_token: token,
                reset_token_expires: {
                    gt: new Date(),
                },
            },
        });
    }

    async update(id: number, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
