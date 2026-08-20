import { SwipeGame } from "@/components/SwipeGame";

export const metadata = {
  title: "Le jeu — Programmes2027",
};

export default function JeuPage() {
  return (
    <main className="flex flex-1 flex-col bg-slate-50">
      <SwipeGame />
    </main>
  );
}
