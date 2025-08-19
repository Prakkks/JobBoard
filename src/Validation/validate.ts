import { z } from "zod";

export const jobschema = z.object({
  title: z.string("A Jobtitle is required").min(3, "Title should be greater than 3 character"),
  description: z.string("Description is required").min(10, "Description should be greater than 10 characters"),
  salary: z.number("Enter salary").min(100, "Enter amount greater than 100"),
  jobType: z.number("Select one of the job type"),
  opennings: z.number("Enter number of openings").min(1, "No. of employee should be 1 or more"),
  company: z.string().min(3, "Enter valid company name").max(50, "Company name can't extend 50 words."),
  location: z.string().min(2, "Enter valid location name").max(50, "location name can't extend 50 words."),
  time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export const JobFilterSchema = z.object({
  jobType: z.string("Select any one type").optional(),
  location: z.string().optional(),
});


export const IndividualJobApplySchema = z.object({
  name: z.string("Enter your name"),
  email: z.email("Enter valid email address."),
  phone: z.number("Enter your phone number").nonnegative('Enter positive value').min(10, 'Enter 10 digit number'),
  // cv: z.custom<FileList>((val) => val instanceof FileList && val.length > 0, { message: "File is required",})
  //              .refine((file)=> {  file[0].size <=  (5* 1024 * 1024) , { message: "File shouldn't exceed more than 5MB. " }  })
  //              .refine( (file)=> ["application/pdf", 'application/msword'].includes(file[0].type), {message: 'Invalid document file type'}),
  cv: z.instanceof(File, {message: 'File is required'}),
  // .refine((files) => files > 0, {
  //   message: "File is required",
  // })
  // .refine(
  //   (files) => files.length > 0 && files[0].size <= 5 * 1024 * 1024,
  //   { message: "File shouldn't exceed more than 5MB." }
  // )
  // .refine(
  //   (files) =>
  //     files.length > 0 &&
  //     ["application/pdf", "application/msword"].includes(files[0].type),
  //   { message: "Invalid document file type" }
  // ),


});

export type JobSchemaType = z.infer<typeof jobschema>;
export type JobFilterSchemaType = z.infer<typeof JobFilterSchema>;
export type IndividualJobApplySchemaType = z.infer<typeof IndividualJobApplySchema>;
