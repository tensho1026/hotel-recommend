import ResultsClient from "@/components/ResultsClient";

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (typeof v === "string" && v) sp.set(k, v);
  }
  return (
    <div className="px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">検索結果 🏨</h1>
        <p className="text-sm text-foreground/70 mb-6">
          条件を変更するにはブラウザの戻るで戻ってください。
        </p>
        <ResultsClient query={sp.toString()} />
      </div>
    </div>
  );
}
