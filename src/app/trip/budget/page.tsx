"use client";

import { BUDGETS } from "@/lib/regions";
import StepShell from "@/components/StepShell";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BudgetStep() {
  const router = useRouter();
  const params = useSearchParams();
  const [budget, setBudget] = useState<string>(
    params.get("budgetLabel") || BUDGETS[0].label
  );

  function next() {
    const sp = new URLSearchParams(params.toString());
    sp.set("budgetLabel", budget);
    router.push(`/trip/type?${sp.toString()}`);
  }

  return (
    <div className="px-6 py-10">
      <StepShell
        title="ご予算は？ 💴"
        step={4}
        total={5}
        backHref={`/trip/nights?${params.toString()}`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {BUDGETS.map((b) => (
            <button
              key={b.label}
              className={
                "rounded-xl border px-3 py-3 text-center " +
                (budget === b.label
                  ? "bg-amber-100 border-amber-200 text-amber-900"
                  : "bg-white/80 border-rose-200/60")
              }
              onClick={() => setBudget(b.label)}
            >
              {b.label}
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
