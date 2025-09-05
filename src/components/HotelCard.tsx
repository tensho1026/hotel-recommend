"use client";
import { toAffiliateLink } from "@/lib/affiliate";
import type { HotelItem } from "@/lib/types";

export function HotelCard({ hotel }: { hotel: HotelItem }) {
  const link = hotel.infoUrl ? toAffiliateLink(hotel.infoUrl) : undefined;
  return (
    <div className="flex gap-4 rounded-xl border border-rose-200/60 p-4 shadow-sm bg-white/80 backdrop-blur w-full">
      <div className="relative w-28 h-28 shrink-0 rounded overflow-hidden bg-rose-50">
        {hotel.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full grid place-content-center text-xs text-foreground/60">
            No Image
          </div>
        )}
      </div>
      <div className="grow min-w-0">
        <div className="text-base font-semibold mb-1 truncate">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="hover:underline"
            >
              {hotel.name}
            </a>
          ) : (
            hotel.name
          )}
        </div>
        {hotel.address && (
          <div className="text-sm text-foreground/70 truncate">{hotel.address}</div>
        )}
        <div className="mt-2 flex items-center gap-3 text-sm">
          {hotel.minCharge !== undefined && (
            <span className="inline-flex items-center rounded-full bg-rose-100 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100 px-2 py-0.5">
              最安: {hotel.minCharge.toLocaleString()}円
            </span>
          )}
          {hotel.reviewAverage !== undefined && (
            <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-900 dark:bg-sky-900/30 dark:text-sky-100 px-2 py-0.5">
              評価: {hotel.reviewAverage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
