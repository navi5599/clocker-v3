import { z } from "zod";

const User = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

export const validateForm = (email: string, password: string) => {
  const formData = { email, password };

  try {
    User.parse(formData);
    return true; // Validation successful
  } catch (error: any) {
    console.error("Validation Error:", error);
    return false; // Validation failed
  }
};

export type User = z.infer<typeof User>;
