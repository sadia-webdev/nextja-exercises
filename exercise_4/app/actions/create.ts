"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todo";
import { Priority } from "../types/todo";

export type FormState = {
  error?: string;
  success?: boolean;
};

export async function createTodoAction(
  prevState: FormState,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const priority = formData.get("priority") as Priority;

  if (!title || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  if (priority !== "low" && priority !== "medium" && priority !== "high") {
    return { error: "Invalid priority value" };
  }
  if (title.length > 50) {
    return { error: "Title must be less than 50 characters" };
  }

  const todoId = await createTodo({ title: title.trim(), priority: priority });

  if (!todoId) {
    return { error: "Failed to create todo" };
  }

  revalidatePath("/");
  redirect("/");
}
