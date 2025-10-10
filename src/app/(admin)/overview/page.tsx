export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Operations overview
        </h1>
        <p className="text-sm text-foreground/70 sm:text-base">
          Monitor revenue, project throughput, and team activity across the business.
        </p>
      </section>
    </div>
  );
}
