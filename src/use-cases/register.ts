import { hash } from "bcryptjs";
import type { UserDto } from "../DTOs/user";
import { prisma } from "../lib/prisma";

export async function registerUseCase(user: UserDto) {
	const { email, name, password } = user;
	const existing_user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (existing_user) {
		throw new Error("User already exists");
	}

	const password_hash = await hash(password, 6);

	// repositoy pattern
	await prisma.user.create({
		data: {
			email,
			name,
			password: password_hash,
		},
	});
}
