import { z } from "zod"

export const TODOZODO = z.object({
    title: z.string().min(3, "Title have min 3 letters").max(20, "Title have max 20 letters"),
    description: z.string(),
    dateTime: z.string(),
    duration: z.string(),
    priority: z.enum(["low", "medium", "high"], {
        required_error: "Priority is required",
        invalid_type_error: "Priority must be one of: Low, Medium, High"
    }),
    listName: z.string()
})