import { hash } from "bcryptjs";
import type { User } from "../../generated/prisma";
import type { IUsersRepository } from "../reporitories/users-interface-repository";
import type { UserDto } from "../types/user";

// UseCase/Service Patterns
// Responsável pela lógica de negócio de criação de usuário
// Permite com que a lógica responsável por criar um usuário possa ser testada e usada em outros lugares e não somente no controler específico de criação de usuário

interface RegisterUsecaseResponse {
	user: User;
}

export class RegisterUseCase {
	// DIP - Dependency Inversion Principle
	// Um dos 5 princípios SOLID - responsável por desacoplar a reponsabilidade de persistir um usuário(banco de dados) do caso de uso/service
	// A implementação da persistência de um usuário em banco de dados ou outra forma se torna completamente independente do resto da aplicação
	constructor(private userRepository: IUsersRepository) {}

	async execute({
		email,
		name,
		password,
	}: UserDto): Promise<RegisterUsecaseResponse> {
		const hash_password = await hash(password, 6);

		const user = await this.userRepository.findByEmail(email);

		if (user) {
			throw new Error("User already exists");
		}

		const newUser = await this.userRepository.create({
			email,
			name,
			password: hash_password,
		});

		return { user: newUser };
	}
}
