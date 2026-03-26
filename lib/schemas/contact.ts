import { z } from "zod";

export const contactFormSchema = z.object({
  requestType: z.enum(["info", "quote", "order"]),
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  jobTitle: z.string().optional(),
  material: z.string().optional(),
  cuttingSpeed: z.string().optional(),
  thickness: z.string().optional(),
  productModel: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

const REQUEST_TYPE_LABELS: Record<ContactFormData["requestType"], string> = {
  info: "More Information",
  quote: "Request a Quote",
  order: "Order Product",
};

export function getRequestTypeLabel(type: ContactFormData["requestType"]): string {
  return REQUEST_TYPE_LABELS[type];
}
