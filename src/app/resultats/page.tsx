import { ResultsView } from "@/components/ResultsView";

export const metadata = {
  title: "Vos résultats — Programmes2027",
};

export default function ResultatsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ResultsView />
    </main>
  );
}
