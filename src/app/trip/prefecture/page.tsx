"use client";

import { REGIONS } from "@/lib/regions";
import StepShell from "@/components/StepShell";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PrefectureStep() {
  const router = useRouter();
  const params = useSearchParams();
  const region = params.get("region") as keyof typeof REGIONS | null;
  const [pref, setPref] = useState<string | null>(
    params.get("prefecture") || null
  );

  useEffect(() => {
    if (!region) router.replace("/trip/region");
  }, [region, router]);

  const prefectures = useMemo(() => (region ? REGIONS[region] : []), [region]);

  function next() {
    if (!region || !pref) return;
    const sp = new URLSearchParams(params.toString());
    sp.set("region", region);
    sp.set("prefecture", pref);
    router.push(`/trip/nights?${sp.toString()}`);
  }

  if (!region) return null;

  return (
    <div className="px-6 py-10">
      <StepShell
        title="都道府県はどちら？ 🏞️"
        subtitle="地域に含まれる都道府県から選んでください。"
        step={2}
        total={5}
        backHref={`/trip/region?${params.toString()}`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {prefectures.map((p) => (
            <button
              key={p}
              className={
                "rounded-xl border px-3 py-3 text-center " +
                (pref === p
                  ? "bg-sky-100 border-sky-200 text-sky-900"
                  : "bg-white/80 border-rose-200/60")
              }
              onClick={() => setPref(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={next}
            disabled={!pref}
            className="rounded-md bg-rose-500 text-white px-4 py-2 disabled:opacity-50"
          >
            次へ
          </button>
        </div>
      </StepShell>
    </div>
  );
}
