import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hello World" },
      { name: "description", content: "A blank React + Tailwind + Vite starter." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <h1 className="text-4xl font-semibold text-black">Hello World</h1>
    </main>
  );
}
