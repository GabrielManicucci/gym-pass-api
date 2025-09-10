import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { AppRoutes } from "./http/routes";

export const app = fastify();

app.register(AppRoutes);

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError)
		reply
			.status(400)
			.send({ message: "validation error", issues: error.format() });

	if (env.NODE_ENV !== "production") {
		console.log(error);
	} else {
		// here use external error tools like Sentry/Datalog...
	}

	reply.status(500).send(error);
});
