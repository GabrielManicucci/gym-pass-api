import type { User } from "../../generated/prisma";
import type { IUsersRepository } from "../reporitories/users-interface-repository";

export class GetUserProfile {
	constructor(private usersRepository: IUsersRepository) {}

	async execute(id: string): Promise<User> {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}
}
