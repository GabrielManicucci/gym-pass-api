import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryUsersRepository } from "../reporitories/in-memory-repository";
import { RegisterUseCase } from "./register";

let registerUsecase: RegisterUseCase;

describe("Register Use case", () => {
	beforeEach(() => {
		const userRepository = new InMemoryUsersRepository();
		registerUsecase = new RegisterUseCase(userRepository);
	});

	test("Create a new user", async () => {
		// Test code here
		const user = await registerUsecase.execute({
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password",
		});

		expect(user.id).toEqual(expect.any(String));
	});
});
