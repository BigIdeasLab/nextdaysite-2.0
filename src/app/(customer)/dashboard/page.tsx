export default function CustomerDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Project pulse
        </h1>
        <p className="text-sm text-foreground/70 sm:text-base">
          Track active builds, review deliverables, and stay in sync with your launch team.
        </p>
      </section>
    </div>
  );
}
