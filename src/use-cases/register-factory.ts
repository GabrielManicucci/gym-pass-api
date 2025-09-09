import { UsersRepository } from "../reporitories/users-repository";
import { RegisterUseCase } from "./register";

// Factory Patterns
// Design pattern que permite desacoplar a criação de objetos de sua utilização, ou seja, dessa forma o controller responsável pela criação de usuário só irá precisar da factory para criar o caso de uso e não precisará conhecer a implementação do caso de uso e nenhuma dependência externa como banco de dados, orms...
export function RegisterFactory() {
	const userRepository = new UsersRepository();
	const registerUseCase = new RegisterUseCase(userRepository);

	return registerUseCase;
}
