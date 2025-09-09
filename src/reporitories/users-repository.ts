import type { User } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
import type { UserDto } from "../types/user";
import type { IUsersRepository } from "./users-interface-repository";

// Repository Pattern
// Responsável pela logíca de persistência de dados relacionados a usuários.
// Implementa um contrato(interface) - dessa forma é possível implementar o DIP do SOLID

export class UsersRepository implements IUsersRepository {
	async create({ email, name, password }: UserDto) {
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password,
			},
		});
		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		return user;
	}
}
