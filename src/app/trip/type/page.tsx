"use client";

import { TRAVEL_TYPES } from "@/lib/regions";
import StepShell from "@/components/StepShell";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TypeStep() {
  const router = useRouter();
  const params = useSearchParams();
  const [t, setT] = useState<string>(params.get("travelType") || TRAVEL_TYPES[0]);

  function finish() {
    const sp = new URLSearchParams(params.toString());
    sp.set("travelType", t);
    router.push(`/results?${sp.toString()}`);
  }

  return (
    <div className="px-6 py-10">
      <StepShell
        title="どんな旅？ 🎒"
        subtitle="検索の精度を上げるためのキーワードになります。"
        step={5}
        total={5}
        backHref={`/trip/budget?${params.toString()}`}
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {TRAVEL_TYPES.map((type) => (
            <button
              key={type}
              className={
                "rounded-full border px-4 py-2 text-sm " +
                (t === type
                  ? "bg-violet-100 border-violet-200 text-violet-900"
                  : "bg-white/80 border-rose-200/60")
              }
              onClick={() => setT(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={finish}
            className="rounded-md bg-rose-500 text-white px-4 py-2"
          >
            アンケート完了・検索
          </button>
        </div>
      </StepShell>
    </div>
  );
}
