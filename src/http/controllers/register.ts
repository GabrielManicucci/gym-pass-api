import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";
import { RegisterFactory } from "../../use-cases/register-factory";

// MVC Pattern - Model / View / Controller`
//
// Controller {
// controla a porta de entrada e de saída da aplicação
// }

// Controller pattern
export async function registerController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	// DTO - Data transfer object
	const registerBodySchema = z.object({
		email: z.email(),
		name: z.string().min(2).max(100),
		password: z.string().min(8).max(100),
	});

	const { email, name, password } = registerBodySchema.parse(request.body);

	try {
		const RegisterUseCase = RegisterFactory();
		await RegisterUseCase.execute({
			email,
			name,
			password,
		});
	} catch (error: unknown) {
		if (error instanceof UserAlreadyExistsError) {
			reply.status(409).send({ error: error.message });
		}

		throw error;
	}

	reply.status(201).send({ message: "User created successfully" });
}
