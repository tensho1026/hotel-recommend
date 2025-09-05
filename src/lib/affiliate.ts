const DEFAULT_AFFILIATE_BASE =
  // あなたのアフィリエイトリンク（pc=にホテルURLを入れる形式）
'https://hb.afl.rakuten.co.jp/hgc/4c005caa.d3e16590.4c005cab.26bf84e8/?pc=https%3A%2F%2Ftravel.rakuten.co.jp%2F&link_type=hybrid_url&ut=eyJwYWdlIjoidXJsIiwidHlwZSI6Imh5YnJpZF91cmwiLCJjb2wiOjF9';

export function toAffiliateLink(hotelInformationUrl: string) {
  const envBase = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_BASE;
  const base = envBase || DEFAULT_AFFILIATE_BASE;

  // 1) ENCODED_URL プレースホルダ形式（推奨）
  if (base.includes("ENCODED_URL")) {
    return base.replace("ENCODED_URL", encodeURIComponent(hotelInformationUrl));
  }

  // 2) すでに pc= が含まれている生URL形式（例: あなたが送ってくれた完成URL）
  try {
    const u = new URL(base);
    // URLSearchParams は自動でエンコードするため、生のURLを渡す
    u.searchParams.set("pc", hotelInformationUrl);
    return u.toString();
  } catch {
    // 3) それ以外は安全に結合できないため、フォールバック（最後に &pc= を付与）
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}pc=${encodeURIComponent(hotelInformationUrl)}`;
  }
}
