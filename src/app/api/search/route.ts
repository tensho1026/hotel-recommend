import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { nightsFromOption, prefectureToCode } from "@/lib/regions";
import { computeStay, defaultCheckinBase } from "@/lib/dates";

const RAKUTEN_ENDPOINT =
  "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426";

type Params = {
  prefecture: string; // 日本語名
  nights: string; // e.g. "1泊", "4泊以上"
  budgetLabel?: string; // e.g. "〜5,000円"
  travelType?: string; // e.g. "家族旅行"
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const prefecture = searchParams.get("prefecture") || "東京";
    const nightsLabel = searchParams.get("nights") || "1泊";
    const budgetLabel = searchParams.get("budgetLabel") || undefined;
    const travelType = searchParams.get("travelType") || undefined;

    const nights = nightsFromOption(nightsLabel as any);
    const { checkinDate, checkoutDate } = computeStay(
      defaultCheckinBase(),
      nights
    );

    const appId = process.env.RAKUTEN_APPLICATION_ID;
    if (!appId) {
      return Response.json(
        { error: "Missing RAKUTEN_APPLICATION_ID env" },
        { status: 500 }
      );
    }

    const params: Record<string, string> = {
      applicationId: appId,
      format: "json",
      checkinDate,
      checkoutDate,
    };

    // エリア指定: classCode を使用
    const areaCode = prefectureToCode(prefecture);
    if (areaCode) {
      params.largeClassCode = "japan";
      params.middleClassCode = areaCode;
      params.smallClassCode = areaCode;
      // detailClassCode は狭くなりやすいのでデフォルト未指定。
      // クエリで detailClassCode が指定されていれば尊重
      const detail = searchParams.get("detailClassCode");
      if (detail) params.detailClassCode = detail;
    } else {
      // フォールバック: 最低限のキーワードで検索（県名 + ホテル）
      params.keyword = `${prefecture} ホテル`;
    }

    // 旅行タイプは補助的に keyword へ付与
    if (travelType) {
      params.keyword = [params.keyword, travelType].filter(Boolean).join(" ");
    }

    // 価格帯
    const lower = searchParams.get("lowerPrice");
    const upper = searchParams.get("upperPrice");
    if (lower) params.lowerPrice = lower;
    if (upper) params.upperPrice = upper;

    const query = new URLSearchParams(params);

    const url = `${RAKUTEN_ENDPOINT}?${query.toString()}`;
    console.info("[Rakuten API URL]", url);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return Response.json(
        { error: `Rakuten API error: ${res.status}` },
        { status: 502 }
      );
    }
    const data = await res.json();

    return Response.json(data, { status: 200 });
  } catch (e: any) {
    return Response.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
