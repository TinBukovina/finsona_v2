import { signOutAction } from "@/_server/actions/auth";
import { auth } from "../../../auth";

export default async function AppPage() {
  const session = await auth();

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-card border-border rounded-card text-card-foreground flex w-full max-w-md flex-col gap-6 border p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Dobrodošli!</h1>
          <p className="text-muted-foreground">
            Uspješno ste prijavljeni u aplikaciju.
          </p>
        </div>

        {session?.user ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-center">
              Prijavljeni ste kao:{" "}
              <span className="font-semibold">{session.user.email}</span>
            </p>

            {/* Forma za odjavu.
              Kada se gumb stisne, poziva se `signOutAction` na serveru.
              Auth.js će automatski obrisati kolačić sesije i preusmjeriti korisnika.
            */}
            <form action={signOutAction}>
              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 ring-offset-background focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Odjavi se
              </button>
            </form>
          </div>
        ) : (
          <p className="text-destructive text-center">Niste prijavljeni.</p>
        )}
      </div>
    </div>
  );
}
