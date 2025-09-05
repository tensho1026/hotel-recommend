"use client";

import { useEffect, useState } from "react";
import { HotelCard } from "@/components/HotelCard";
import type { HotelItem } from "@/lib/types";
import { flattenHotels } from "@/lib/parse";
import { findBudget } from "@/lib/regions";

export default function ResultsClient({ query }: { query: string }) {
  const [items, setItems] = useState<HotelItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(query);
    const budgetLabel = params.get("budgetLabel");
    if (budgetLabel) {
      const b = findBudget(budgetLabel);
      if (b) {
        params.set("lowerPrice", String(b.lower ?? 0));
        if (b.upper !== undefined) params.set("upperPrice", String(b.upper));
      }
    }
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "検索に失敗しました");
        setItems(flattenHotels(data));
      } catch (e: any) {
        setError(e?.message || "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (loading) return <div className="text-sm">検索中...</div>;
  if (error)
    return <div className="text-sm text-red-600 dark:text-red-400">{error}</div>;
  if (!items) return null;

  return (
    <div className="grid grid-cols-1 gap-4">
      {items.length === 0 && (
        <div className="text-sm text-foreground/70">該当するホテルが見つかりませんでした。</div>
      )}
      {items.map((h) => (
        <HotelCard key={h.id} hotel={h} />
      ))}
    </div>
  );
}
