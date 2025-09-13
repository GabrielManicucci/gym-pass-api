import { uuidv4 } from "zod";
import type { Prisma, User } from "../../generated/prisma";
import type { UsersRepository } from "./users-repository";

export class InMemoryUsersRepository implements UsersRepository {
	private users: User[] = [];

	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user: User = {
			id: String(uuidv4()),
			email: data.email,
			name: data.name ? data.name : "",
			password: data.password,
		};
		this.users.push(user);
		return user;
	}

	async findById(id: string): Promise<User | null> {
		return this.users.find((user) => user.id === id) ?? null;
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.users.find((user) => user.email === email) ?? null;
	}

	async list(): Promise<User[]> {
		return this.users;
	}
}
