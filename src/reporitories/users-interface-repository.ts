import type { User } from "../../generated/prisma";
import type { UserDto } from "../types/user";

// Interface(contrato) responsável pela logíca de persistência de dados relacionados a usuários.
// Usada no caso de uso/service como inversão de dependência

export interface IUsersRepository {
	create(data: UserDto): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
}
