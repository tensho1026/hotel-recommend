"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function StepShell({
  title,
  subtitle,
  step,
  total,
  backHref,
  children,
}: PropsWithChildren<{
  title: string;
  subtitle?: string;
  step: number;
  total: number;
  backHref?: string | null;
}>) {
  const router = useRouter();
  return (
    <div className="min-h-[70vh] w-full max-w-xl mx-auto">
      <div className="mb-6 flex items-center justify-between text-sm text-foreground/70">
        <div>
          ステップ {step} / {total}
        </div>
        {backHref ? (
          <button
            className="text-foreground/70 hover:text-foreground underline"
            onClick={() => router.push(backHref)}
          >
            戻る
          </button>
        ) : (
          <span />
        )}
      </div>
      <div className="rounded-2xl border border-rose-200/60 bg-white/80 backdrop-blur p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        {subtitle && (
          <p className="text-sm text-foreground/70 mb-6">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
