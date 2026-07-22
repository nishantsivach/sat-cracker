import { Check, Minus } from "lucide-react";

const comparison = [
  {
    feature: "SAT Guide",
    free: true,
    monthly: true,
    yearly: true,
  },
  {
    feature: "Blog Articles",
    free: true,
    monthly: true,
    yearly: true,
  },
  {
    feature: "Practice Questions",
    free: true,
    monthly: true,
    yearly: true,
  },
  {
    feature: "AI SAT Tutor",
    free: "20 messages/day",
    monthly: "Unlimited",
    yearly: "Unlimited",
  },
  {
    feature: "SAT Courses",
    free: "Preview only",
    monthly: "Full access",
    yearly: "Full access",
  },
  {
    feature: "Video Lessons",
    free: false,
    monthly: true,
    yearly: true,
  },
  {
    feature: "Mock Tests",
    free: "Selected",
    monthly: "All tests",
    yearly: "All tests",
  },
  {
    feature: "Answer Explanations",
    free: "Basic",
    monthly: "Detailed",
    yearly: "Detailed",
  },
  {
    feature: "Performance Analytics",
    free: false,
    monthly: true,
    yearly: true,
  },
  {
    feature: "Priority Feature Access",
    free: false,
    monthly: true,
    yearly: true,
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="mx-auto h-4 w-4 text-site-success" />;
  }

  if (value === false) {
    return <Minus className="mx-auto h-4 w-4 text-site-border" />;
  }

  return (
    <span className="text-sm font-medium text-site-text">
      {value}
    </span>
  );
}

export default function PricingComparison() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-site-highlight rounded-full px-4 py-1.5 mb-5 border border-site-border">
            <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
            <span className="text-xs font-bold tracking-[0.2em] text-site-primary uppercase">
              Compare
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-site-text leading-[1.1] tracking-tight">
            What&apos;s included
            <br />
            <span className="text-site-secondary">in each plan.</span>
          </h2>

          <p className="mt-4 text-site-muted text-lg leading-relaxed max-w-xl mx-auto">
            See exactly what you get with each plan. No hidden fees, no surprises.
          </p>
        </div>

        <div className="rounded-2xl border border-site-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-site-primary text-white">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                    Free
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider bg-site-accent text-site-primary">
                    Monthly
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                    Yearly
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-site-border">
                {comparison.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-site-highlight/30"
                    } hover:bg-site-highlight/50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-site-text">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Cell value={row.free} />
                    </td>
                    <td className="px-6 py-4 text-center bg-site-accent/[0.03]">
                      <Cell value={row.monthly} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Cell value={row.yearly} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-site-muted">
          Monthly and Yearly plans include the same features. Yearly billing saves you more.
        </p>
      </div>
    </section>
  );
}