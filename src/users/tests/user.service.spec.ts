import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
    let service: UserService;
    let repository: Partial<Record<keyof UserRepository, jest.Mock>>;

    beforeEach(async () => {
        repository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: UserRepository, useValue: repository },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('deve criar um usuário', async () => {
        const dto = { email: 'teste@email.com', password: '123456' };
        repository.findByEmail!.mockResolvedValue(null);
        repository.create!.mockResolvedValue({ id: 1, ...dto });

        const result = await service.create(dto);
        expect(result).toEqual({ id: 1, ...dto });
    });

    it('deve lançar erro se o usuário não for encontrado', async () => {
        repository.findById!.mockResolvedValue(null);
        await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('deve atualizar um usuário existente', async () => {
        const user = { id: 1, email: 'a@a.com', password: 'abc' };
        repository.findById!.mockResolvedValue(user);
        repository.update!.mockResolvedValue({ ...user, name: 'Novo Nome' });

        const result = await service.update(1, { name: 'Novo Nome' });
        expect(result.name).toBe('Novo Nome');
    });
});
