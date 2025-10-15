import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center gap-4">
      <h1>This is homepage</h1>
      <Link
        href={"/app"}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2"
      >
        Go to app
      </Link>
    </main>
  );
}
