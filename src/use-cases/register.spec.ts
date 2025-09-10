import { beforeEach, describe, expect, it, test } from "vitest";
import { UsersRepository } from "../reporitories/users-repository";
import { RegisterUseCase } from "./register";

describe("Register Use case", () => {
	beforeEach(() => {
		const userRepository = new UsersRepository();
		const registerUseCase = new RegisterUseCase(userRepository);
	});

	test("initial test", async () => {
		// Test code here
		expect(2 + 2).toBe(4);
	});
});
