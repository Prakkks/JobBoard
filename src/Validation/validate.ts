import { z } from "zod";

export const jobschema = z.object({
  title: z
    .string("A Jobtitle is required")
    .min(3, "Title should be greater than 3 character"),
  description: z
    .string("Description is required")
    .min(10, "Description should be greater than 10 characters"),
  salary: z.number("Enter salary").min(100, "Enter amount greater than 100"),
  jobType: z.string("Select one of the job type"),
  opennings:z.number('Enter number of openings').min(1,'No. of employee should be 1 or more'),
  company: z
    .string()
    .min(3, "Enter valid company name")
    .max(50, "Company name can't extend 50 words."),
  location: z
    .string()
    .min(2, "Enter valid location name")
    .max(50, "location name can't extend 50 words."),
  // date: z.date();

  time: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
});

export const JobFilterSchema = z.object({
  jobType: z.string("Select any one type").optional(),
  location: z.string().optional(),
});

export type JobSchemaType = z.infer<typeof jobschema>;
export type JobFilterSchemaType = z.infer<typeof JobFilterSchema>;
