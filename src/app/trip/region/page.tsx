"use client";

import { REGIONS } from "@/lib/regions";
import StepShell from "@/components/StepShell";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegionStep() {
  const router = useRouter();
  const params = useSearchParams();
  const current = (params.get("region") as keyof typeof REGIONS) || "関東";

  function goNext(region: keyof typeof REGIONS) {
    const sp = new URLSearchParams(params.toString());
    sp.set("region", region);
    // reset prefecture if region changed
    sp.delete("prefecture");
    router.push(`/trip/prefecture?${sp.toString()}`);
  }

  return (
    <div className="px-6 py-10">
      <StepShell
        title="どの地域へ行きますか？ 🗺️"
        subtitle="おおまかなエリアを選んでください。"
        step={1}
        total={5}
        backHref={null}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.keys(REGIONS).map((r) => (
            <button
              key={r}
              className={
                "rounded-xl border px-3 py-3 text-center " +
                (current === r
                  ? "bg-rose-100 border-rose-200 text-rose-900"
                  : "bg-white/60 dark:bg-white/5")
              }
              onClick={() => goNext(r as keyof typeof REGIONS)}
            >
              {r}
            </button>
          ))}
        </div>
      </StepShell>
    </div>
  );
}

