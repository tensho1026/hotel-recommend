import type { HotelItem } from "@/lib/types";

type ApiResponse = any;

export function flattenHotels(data: ApiResponse): HotelItem[] {
  const items: HotelItem[] = [];
  const hotels = data?.hotels ?? data?.Hotel ?? data?.Items ?? [];
  for (const entry of hotels) {
    const obj = entry?.hotel?.[0] ?? entry?.hotel ?? entry ?? {};
    const rating = entry?.hotel?.[1]?.hotelRatingInfo ?? {};
    const basic = obj?.hotelBasicInfo ?? obj?.HotelBasicInfo ?? {};
    const id = String(basic?.hotelNo ?? basic?.hotelCode ?? basic?.hotelId ?? Math.random());
    const name = basic?.hotelName ?? basic?.HotelName ?? "名称不明";
    const imageUrl = basic?.hotelImageUrl ?? basic?.hotelThumbnailUrl ?? undefined;
    const minCharge = basic?.hotelMinCharge ?? basic?.minCharge ?? undefined;
    const address = [basic?.address1, basic?.address2].filter(Boolean).join(" ");
    // 優先: API が返す情報ページURL / プラン一覧URL
    let infoUrl: string | undefined =
      basic?.hotelInformationUrl ??
      basic?.hotelInformationUrlPc ??
      basic?.planListUrl;

    // フォールバック: hotelNo 等が分かる場合は hinfo 直リンクを生成
    if (!infoUrl) {
      const hotelNo = basic?.hotelNo ?? basic?.hotelCode ?? basic?.hotelId;
      if (hotelNo) {
        // 楽天トラベルのホテル詳細（hinfo）形式
        infoUrl = `https://hotel.travel.rakuten.co.jp/hinfo/?f_no=${encodeURIComponent(
          String(hotelNo)
        )}`;
      }
    }
    const reviewAverage =
      basic?.reviewAverage !== undefined
        ? Number(basic.reviewAverage)
        : rating?.reviewAverage !== undefined
        ? Number(rating.reviewAverage)
        : undefined;
    items.push({ id, name, imageUrl, minCharge, address, infoUrl, reviewAverage });
  }
  return items;
}
