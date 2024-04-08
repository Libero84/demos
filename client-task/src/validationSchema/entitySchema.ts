import { z } from "zod";

const formSchema = z.object({
  entityType: z.string(),
  name: z.string().min(3, "the name must have a minimum of 3 characters"),
});

export const contactSchema = formSchema.extend({
  email: z.string().email(),
  phone: z.string().optional(),
});

export const companySchema = formSchema.extend({
  industry: z.string(),
  contactEmail: z.string().email().optional(),
});
