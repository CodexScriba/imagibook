// schemas.ts

import * as z from "zod";
import * m from "@/paraglide/messages";

//interfaces
//step1
export interface Step1Values {
	characters: {
		name: string;
		description?:string;
	}[];
}
//Step2
export interface Step2Values {
	mode: "magicWand" | "storybookStudio"
};

//Step 1 schema (characters)
export const step1Schema = z.object({
	characters: z
	  .array(
		z.object({
		  name: z
			.string()
			.min(2, m.characters_errors_nameRequired())
			.refine((val) => (val.match(/[A-Za-z]/g) || []).length >= 2, {
			  message: m.characters_errors_nameRequired(),
			}),
		  description: z.string().optional(),
		})
	  )
	  .min(1, m.characters_errors_atLeastOne()),
  });

  // Step 2 schema (creation mode)
export const step2Schema = z.object({
	mode: z.enum(["magicWand", "storybookStudio"], {
	  errorMap: () => ({ message: m.creationMode_errors_required() }),
	}),
  });
  
  export interface FormValues extends Partial<Step1Values>, Partial<Step2Values> {}
