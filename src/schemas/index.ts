import { z } from "zod";

const FileSchema = z.object({
  name: z.string(), // A File object must have a string `name`
  size: z.number(), // A File object must have a numeric `size`
  type: z.string(), // A File object must have a string `type`
});

export const videoUploadSchema = z.object({
  title: z.string().min(5, "Title is required"),
  description: z
    .string()
    .min(20, "Description should be at least 20 characters"),
  file: FileSchema,
});
