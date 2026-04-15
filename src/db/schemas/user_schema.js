import {z} from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1),
    last_name: z.string().min(1),
  email: z.string().email(),
  passwordHash: z.string().min(8),
  createdAt: z.date(),
  updatedAt: z.date(),
}

);