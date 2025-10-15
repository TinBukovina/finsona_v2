"use client";

import { FormEvent } from "react";
import { trpc } from "@/_server/client";
import { SelectBudgetItem } from "@/_db/schema";

export default function BudgetsClient() {
  const getBudgetItemsQuery = trpc.getBudgetItems.useQuery();

  // 2. PRIPREMA ZA MUTACIJE
  // Dobivamo 'utils' objekt koji nam omogućuje da ručno osvježimo druge queryje
  const utils = trpc.useUtils();

  // 3. KREIRANJE PODATAKA (CREATE) pomoću useMutation
  const createBudgetItemMutation = trpc.createBudgetItem.useMutation({
    onSuccess: () => {
      utils.getBudgetItems.invalidate();
    },
  });

  // 4. AŽURIRANJE PODATAKA (UPDATE)
  const updateBudgetItemMutation = trpc.updateBudgetItem.useMutation({
    onSuccess: () => {
      utils.getBudgetItems.invalidate();
    },
  });

  // 5. BRISANJE PODATAKA (DELETE)
  const deleteBudgetItemMutation = trpc.deleteBudgetItem.useMutation({
    onSuccess: () => {
      utils.getBudgetItems.invalidate();
    },
  });

  const handleCreateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createBudgetItemMutation.mutate({
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      plannedAmount: formData.get("plannedAmount") as string,
    });
    e.currentTarget.reset();
  };

  // Handler za ažuriranje imena
  const handleUpdate = (item: SelectBudgetItem) => {
    const newName = prompt("Unesite novo ime:", item.name);
    if (newName && newName !== item.name) {
      updateBudgetItemMutation.mutate({ id: item.id, newName });
    }
  };

  // Stanje zauzetosti - je li bilo koja mutacija u tijeku?
  const isMutating =
    createBudgetItemMutation.isPending ||
    updateBudgetItemMutation.isPending ||
    deleteBudgetItemMutation.isPending;

  // Prikaz stanja učitavanja
  if (getBudgetItemsQuery.isLoading) {
    return <div>Učitavanje podataka...</div>;
  }

  // Prikaz stanja greške
  if (getBudgetItemsQuery.error) {
    return <div>Greška: {getBudgetItemsQuery.error.message}</div>;
  }

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <h1>CRUD Test s tRPC & Neon</h1>
      <h2 style={{ marginTop: "40px" }}>Dodaj novu stavku</h2>

      {/* Forma sada koristi standardni 'onSubmit' */}
      <form
        onSubmit={handleCreateSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "15px",
          border: "1px solid #eee",
          borderRadius: "8px",
        }}
      >
        <input
          name="name"
          placeholder="Ime (npr. Stanarina)"
          required
          style={{ padding: "8px" }}
        />
        <input
          name="category"
          placeholder="Kategorija (npr. Stanovanje)"
          required
          style={{ padding: "8px" }}
        />
        <input
          name="plannedAmount"
          type="number"
          step="0.01"
          placeholder="Planirani iznos (npr. 500.00)"
          required
          style={{ padding: "8px" }}
        />
        <button
          type="submit"
          disabled={isMutating}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          {createBudgetItemMutation.isPending ? "Spremanje..." : "Spremi"}
        </button>
        {createBudgetItemMutation.isError && (
          <p style={{ color: "red" }}>
            {createBudgetItemMutation.error.message}
          </p>
        )}
      </form>

      <h2 style={{ marginTop: "40px" }}>Postojeće stavke</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {getBudgetItemsQuery.data?.map((item) => (
          <li
            key={item.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{item.name}</strong> ({item.category}) -{" "}
              {item.plannedAmount}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleUpdate(item)}
                disabled={isMutating}
                style={{ cursor: "pointer" }}
              >
                Ažuriraj
              </button>
              <button
                onClick={() => deleteBudgetItemMutation.mutate({ id: item.id })}
                disabled={isMutating}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#ffdddd",
                  color: "#af2323",
                }}
              >
                Obriši
              </button>
            </div>
          </li>
        ))}
      </ul>
      {getBudgetItemsQuery.data?.length === 0 && <p>Nema unesenih stavki.</p>}
    </div>
  );
}
