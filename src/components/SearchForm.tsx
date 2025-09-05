"use client";

import { useMemo, useState } from "react";
import { BUDGETS, NIGHT_OPTIONS, REGIONS, TRAVEL_TYPES } from "@/lib/regions";
import type { NightOption } from "@/lib/regions";
import { HotelCard } from "./HotelCard";
import type { HotelItem } from "@/lib/types";
import { flattenHotels } from "@/lib/parse";

export default function SearchForm() {
  const [region, setRegion] = useState<keyof typeof REGIONS>("関東");
  const [prefecture, setPrefecture] = useState<string>(REGIONS["関東"][5]); // 東京
  const [nights, setNights] = useState<NightOption>("1泊");
  const [budgetLabel, setBudgetLabel] = useState<string>(BUDGETS[0].label);
  const [travelType, setTravelType] = useState<string>(TRAVEL_TYPES[0]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<HotelItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const prefectures = useMemo(() => REGIONS[region], [region]);

  async function onSearch() {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const selectedBudget = BUDGETS.find((b) => b.label === budgetLabel);
      const params = new URLSearchParams({
        prefecture,
        nights,
        travelType,
      } as any);
      if (selectedBudget?.lower !== undefined)
        params.set("lowerPrice", String(selectedBudget.lower));
      if (selectedBudget?.upper !== undefined)
        params.set("upperPrice", String(selectedBudget.upper));

      const res = await fetch(`/api/search?${params.toString()}`, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "検索に失敗しました");
      const items = flattenHotels(data);
      setResults(items);
    } catch (e: any) {
      setError(e?.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-4 md:p-6 bg-background">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-foreground/80">地域</span>
            <select
              value={region}
              onChange={(e) => {
                const r = e.target.value as keyof typeof REGIONS;
                setRegion(r);
                setPrefecture(REGIONS[r][0]);
              }}
              className="rounded border px-2 py-2 bg-background"
            >
              {Object.keys(REGIONS).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-foreground/80">都道府県</span>
            <select
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              className="rounded border px-2 py-2 bg-background"
            >
              {prefectures.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-foreground/80">宿泊日数</span>
            <select
              value={nights}
              onChange={(e) => setNights(e.target.value as NightOption)}
              className="rounded border px-2 py-2 bg-background"
            >
              {NIGHT_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-foreground/80">予算</span>
            <select
              value={budgetLabel}
              onChange={(e) => setBudgetLabel(e.target.value)}
              className="rounded border px-2 py-2 bg-background"
            >
              {BUDGETS.map((b) => (
                <option key={b.label} value={b.label}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span className="text-foreground/80">旅行タイプ</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {TRAVEL_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTravelType(t)}
                  className={
                    "px-3 py-1 rounded-full border text-sm " +
                    (travelType === t
                      ? "bg-foreground text-background"
                      : "bg-transparent")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </label>

          <div className="sm:col-span-2 mt-2">
            <button
              onClick={onSearch}
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 font-medium hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "検索中..." : "検索"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      {results && (
        <div className="mt-6 grid grid-cols-1 gap-4">
          {results.length === 0 && (
            <div className="text-sm text-foreground/70">該当するホテルが見つかりませんでした。</div>
          )}
          {results.map((h) => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </div>
      )}
    </div>
  );
}
