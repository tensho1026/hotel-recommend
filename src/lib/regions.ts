export type RegionKey =
  | "北海道"
  | "東北"
  | "関東"
  | "中部"
  | "近畿"
  | "中国"
  | "四国"
  | "九州"
  | "沖縄";

export const REGIONS: Record<RegionKey, string[]> = {
  北海道: ["北海道"],
  東北: ["青森", "岩手", "宮城", "秋田", "山形", "福島"],
  関東: ["茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川"],
  中部: [
    "新潟",
    "富山",
    "石川",
    "福井",
    "山梨",
    "長野",
    "岐阜",
    "静岡",
    "愛知",
  ],
  近畿: ["三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山"],
  中国: ["鳥取", "島根", "岡山", "広島", "山口"],
  四国: ["徳島", "香川", "愛媛", "高知"],
  九州: ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島"],
  沖縄: ["沖縄"],
};

export const TRAVEL_TYPES = [
  "一人旅",
  "カップル",
  "家族旅行",
  "グループ",
  "ビジネス",
] as const;

export type TravelType = (typeof TRAVEL_TYPES)[number];

export const BUDGETS = [
  { label: "〜5,000円", lower: 0, upper: 5000 },
  { label: "5,001〜10,000円", lower: 5001, upper: 10000 },
  { label: "10,001〜20,000円", lower: 10001, upper: 20000 },
  { label: "20,000円以上", lower: 20001, upper: undefined },
] as const;

export function findBudget(label: string) {
  return BUDGETS.find((b) => b.label === label);
}

export const NIGHT_OPTIONS = ["1泊", "2泊", "3泊", "4泊以上"] as const;

export type NightOption = (typeof NIGHT_OPTIONS)[number];

export function nightsFromOption(opt: NightOption): number {
  if (opt === "4泊以上") return 4; // APIは具体日数が必要なため最小の4泊で検索
  return parseInt(opt.replace("泊", ""), 10);
}

// 楽天トラベルのエリアコード（都道府県 → ローマ字コード）
// middleClassCode / smallClassCode に同じコードを指定しても検索可能（実例あり）
export const PREFECTURE_CODE: Record<string, string> = {
  北海道: "hokkaido",
  青森: "aomori",
  岩手: "iwate",
  宮城: "miyagi",
  秋田: "akita",
  山形: "yamagata",
  福島: "fukushima",
  茨城: "ibaraki",
  栃木: "tochigi",
  群馬: "gunma",
  埼玉: "saitama",
  千葉: "chiba",
  東京: "tokyo",
  神奈川: "kanagawa",
  新潟: "niigata",
  富山: "toyama",
  石川: "ishikawa",
  福井: "fukui",
  山梨: "yamanashi",
  長野: "nagano",
  岐阜: "gifu",
  静岡: "shizuoka",
  愛知: "aichi",
  三重: "mie",
  滋賀: "shiga",
  京都: "kyoto",
  大阪: "osaka",
  兵庫: "hyogo",
  奈良: "nara",
  和歌山: "wakayama",
  鳥取: "tottori",
  島根: "shimane",
  岡山: "okayama",
  広島: "hiroshima",
  山口: "yamaguchi",
  徳島: "tokushima",
  香川: "kagawa",
  愛媛: "ehime",
  高知: "kochi",
  福岡: "fukuoka",
  佐賀: "saga",
  長崎: "nagasaki",
  熊本: "kumamoto",
  大分: "oita",
  宮崎: "miyazaki",
  鹿児島: "kagoshima",
  沖縄: "okinawa",
};

export function prefectureToCode(pref: string): string | undefined {
  return PREFECTURE_CODE[pref];
}
