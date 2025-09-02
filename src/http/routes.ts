import type { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register";

export async function AppRoutes(app: FastifyInstance) {
	app.post("/users", registerController);
}
