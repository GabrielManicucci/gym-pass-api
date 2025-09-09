import type { User } from "../../generated/prisma";

export type UserDto = Omit<User, "id">;
