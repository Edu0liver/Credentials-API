import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: Partial<Record<keyof UserService, jest.Mock>>;

    beforeEach(async () => {
        service = {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{ provide: UserService, useValue: service }],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it('deve criar um usuário', async () => {
        const dto = { email: 'teste@a.com', password: '123' };
        service.create!.mockResolvedValue({ id: 1, ...dto });

        const result = await controller.create(dto);
        expect(result.id).toBe(1);
    });

    it('deve buscar todos os usuários', async () => {
        service.findAll!.mockResolvedValue([{ id: 1, email: 'x@x.com' }]);
        const result = await controller.findAll();
        expect(result).toHaveLength(1);
    });

    it('deve buscar um usuário pelo id', async () => {
        service.findOne!.mockResolvedValue({ id: 1, email: 'a@a.com' });
        const result = await controller.findOne(1);
        expect(result.id).toBe(1);
    });

    it('deve atualizar um usuário', async () => {
        service.update!.mockResolvedValue({ id: 1, name: 'Atualizado' });
        const result = await controller.update(1, { name: 'Atualizado' });
        expect(result.name).toBe('Atualizado');
    });

    it('deve deletar um usuário', async () => {
        service.remove!.mockResolvedValue({ id: 1 });
        const result = await controller.remove(1);
        expect(result.id).toBe(1);
    });
});
