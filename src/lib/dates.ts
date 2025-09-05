export function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// デフォルトは本日+14日をチェックインに
export function defaultCheckinBase() {
  return addDays(new Date(), 14);
}

export function computeStay(checkinBase: Date, nights: number) {
  const checkinDate = checkinBase;
  const checkoutDate = addDays(checkinDate, nights);
  return { checkinDate: formatDate(checkinDate), checkoutDate: formatDate(checkoutDate) };
}

