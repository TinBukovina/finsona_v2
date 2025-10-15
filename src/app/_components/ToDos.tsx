"use client";

import { trpc } from "@/_server/client";

export function TodoList() {
  const getTodos = trpc.getBudgetItems.useQuery();
  console.log(getTodos);
  return (
    <div>
      <div>{JSON.stringify(getTodos.data)}</div>
    </div>
  );
}
