"use client";

import { useEffect, useState } from "react";
import { HotelCard } from "@/components/HotelCard";
import type { HotelItem } from "@/lib/types";
import { flattenHotels } from "@/lib/parse";
import { findBudget } from "@/lib/regions";
import { buildKeywordSearchUrl, toAffiliateLink } from "@/lib/affiliate";

export default function ResultsClient({ query }: { query: string }) {
  const [items, setItems] = useState<HotelItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

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
      setFallbackUrl(null);
      try {
        const res = await fetch(`/api/search?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "検索に失敗しました");
        setItems(flattenHotels(data));
      } catch (e: any) {
        setError(e?.message || "エラーが発生しました");
        // APIが使えない場合のフォールバック: 楽天トラベルの検索ページへ誘導
        const prefecture = params.get("prefecture");
        const travelType = params.get("travelType");
        const kwUrl = buildKeywordSearchUrl({ prefecture, travelType });
        setFallbackUrl(toAffiliateLink(kwUrl));
      } finally {
        setLoading(false);
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (loading) return <div className="text-sm">検索中...</div>;
  if (error)
    return (
      <div className="text-sm">
        <div className="text-red-600 dark:text-red-400 mb-3">{error}</div>
        {fallbackUrl && (
          <a
            href={fallbackUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="inline-flex items-center rounded-md bg-foreground text-background px-3 py-1.5 text-sm hover:opacity-90"
          >
            楽天トラベルで検索結果を開く
          </a>
        )}
      </div>
    );
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
