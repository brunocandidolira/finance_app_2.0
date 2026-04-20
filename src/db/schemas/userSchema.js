import { z } from "zod";

// entrada (request)
export const CreateUserSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email("Email inválido"),
  password: z.string().min(8),
});

// entidade persistida no banco
export const UserSchema = CreateUserSchema.extend({
  id: z.string().uuid(),
});
