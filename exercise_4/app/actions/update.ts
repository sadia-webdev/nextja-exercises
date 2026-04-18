"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateTodo, fetchTodoById } from "../lib/todo";
import { Priority } from "../types/todo";


export type FormState = {
  error?: string | null;
  success?: boolean;
};



export async function updateTodoAction(prevState: FormState | null, formData: FormData): Promise<FormState> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const priority = formData.get("")as Priority

  if (!id) {
    return { error: "Todo ID is required" };
  }

  if (!title || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  if (title.length > 50) {
    return { error: "Title must be less than 50 characters" };
  }


  if (priority && priority !== "low" && priority !== "medium" && priority !== "high") {
    return { error: "Invalid priority value" };
  }




  const existingTodo = await fetchTodoById(id);
  if (!existingTodo) {
    return { error: "Todo not found" };
  }

  const success = await updateTodo(id, { title: title.trim(), priority: priority || existingTodo.priority });

  if (!success) {
    return { error: "Failed to update todo" };
  }

  revalidatePath("/");
  redirect("/");
}
