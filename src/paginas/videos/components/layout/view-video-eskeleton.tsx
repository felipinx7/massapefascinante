export default function ViewVideoEskeleton() {
  return (
    <article className="flex flex-col items-start px-4 gap-4 animate-pulse">
      <div className="h-[600px] w-full rounded-xl bg-black/10 max-md:h-[350px] max-md:rounded-none"></div>
      <div className="w-[50%] px-4 h-6 rounded-lg bg-black/10">
      </div>
      <div className="w-[80%] px-4 h-7 rounded-lg bg-black/10">
      </div>
    </article>
  )
}
