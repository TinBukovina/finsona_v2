import Link from "next/link";
import BudgetsClient from "./_components/BudgetClient";
import { TodoList } from "./_components/ToDos";

export default async function HomePage() {
  return (
    <main>
      {/* Prosljeđujemo podatke klijentskoj komponenti koja se brine za interakciju */}
      <BudgetsClient />
      <TodoList />
      <Link
        href={"/app"}
        className="inline-block bg-yellow-300 p-4 text-red-500"
      >
        App
      </Link>
    </main>
  );
}
