import fastify from "fastify";
import { PrismaClient } from "../generated/prisma";
import z from "zod";
import { prisma } from "./lib/prisma";

export const app = fastify();

app.post("/users", (request, reply) => {
  const registerBodySchema = z.object({
    email: z.string().email(),
    name: z.string().min(2).max(100),
    password: z.string().min(8).max(100),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  prisma.user.create({
    data: {
      email,
      name,
      password,
    }
  }).then(() => {
    reply.status(201).send()
  }).catch((error) => {
    reply.status(400).send({ error: error.message })
  })
})
