export default function Home() {
  return (
    <div className="w-full min-h-[80vh] px-6 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-white/70 dark:bg-white/5 backdrop-blur px-3 py-1 text-sm border border-black/5 dark:border-white/10 mb-4">
          旅の計画を、やさしくシンプルに ✈️
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">次の旅、見つけよう</h1>
        <p className="text-base text-foreground/70 mb-8">
          一問ずつ答えるだけで、あなたに合う宿を楽天トラベルから探します。
        </p>
        <a
          href="/trip/region"
          className="inline-flex items-center justify-center rounded-xl bg-rose-500 text-white px-6 py-3 font-medium hover:opacity-90"
        >
          旅の検索をはじめる
        </a>
      </div>
    </div>
  );
}
