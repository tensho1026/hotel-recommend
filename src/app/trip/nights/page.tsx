"use client";

import { NIGHT_OPTIONS, type NightOption } from "@/lib/regions";
import StepShell from "@/components/StepShell";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NightsStep() {
  const router = useRouter();
  const params = useSearchParams();
  const [nights, setNights] = useState<NightOption>(
    (params.get("nights") as NightOption) || "1泊"
  );

  function next() {
    const sp = new URLSearchParams(params.toString());
    sp.set("nights", nights);
    router.push(`/trip/budget?${sp.toString()}`);
  }

  return (
    <div className="px-6 py-10">
      <StepShell
        title="宿泊日数は？ 🛏️"
        step={3}
        total={5}
        backHref={`/trip/prefecture?${params.toString()}`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {NIGHT_OPTIONS.map((o) => (
            <button
              key={o}
              className={
                "rounded-xl border px-3 py-3 text-center " +
                (nights === o
                  ? "bg-emerald-100 border-emerald-200 text-emerald-900"
                  : "bg-white/80 border-rose-200/60")
              }
              onClick={() => setNights(o)}
            >
              {o}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={next}
            className="rounded-md bg-rose-500 text-white px-4 py-2"
          >
            次へ
          </button>
        </div>
      </StepShell>
    </div>
  );
}
