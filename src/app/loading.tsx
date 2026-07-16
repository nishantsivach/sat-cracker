const Loading = () => {
  return (
    <div className="min-h-screen bg-site-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1B2A4A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Shimmer overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      {/* Header skeleton */}
      <header className="relative z-10 py-4 px-6 border-b border-site-border/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo skeleton */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-site-primary/10 animate-pulse" />
            <div className="h-5 w-28 bg-site-primary/10 rounded-lg animate-pulse" />
          </div>

          {/* Nav items skeleton */}
          <div className="hidden md:flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-20 bg-site-primary/5 rounded-lg animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
            <div className="h-9 w-24 bg-site-primary/10 rounded-xl animate-pulse ml-2" />
          </div>

          {/* Mobile skeleton */}
          <div className="flex md:hidden items-center gap-2">
            <div className="h-8 w-14 bg-site-primary/10 rounded-lg animate-pulse" />
            <div className="h-8 w-8 bg-site-primary/5 rounded-lg animate-pulse" />
          </div>
        </div>
      </header>

      {/* Hero skeleton */}
      <section className="relative z-10 py-16 md:py-20 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Badge skeleton */}
          <div className="flex justify-center mb-10 md:mb-14">
            <div className="h-8 w-56 bg-site-primary/10 rounded-full animate-pulse" />
          </div>

          {/* Headline skeleton */}
          <div className="space-y-4 max-w-4xl mx-auto mb-6">
            <div className="h-10 md:h-14 w-3/4 mx-auto bg-site-primary/10 rounded-xl animate-pulse" />
            <div className="h-10 md:h-14 w-1/2 mx-auto bg-site-primary/10 rounded-xl animate-pulse" />
          </div>

          {/* Subtitle skeleton */}
          <div className="space-y-2 max-w-2xl mx-auto mb-8">
            <div className="h-5 w-full bg-site-primary/5 rounded-lg animate-pulse" />
            <div className="h-5 w-4/5 mx-auto bg-site-primary/5 rounded-lg animate-pulse" />
          </div>

          {/* CTA buttons skeleton */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <div className="h-12 w-48 bg-site-accent/20 rounded-xl animate-pulse" />
            <div className="h-12 w-40 bg-site-primary/5 rounded-xl animate-pulse" />
          </div>

          {/* Stats row skeleton */}
          <div className="flex justify-center gap-8 md:gap-14 mb-14">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center space-y-1.5">
                <div className="h-7 w-16 bg-site-primary/10 rounded-lg animate-pulse mx-auto" />
                <div className="h-3 w-20 bg-site-primary/5 rounded-md animate-pulse mx-auto" />
              </div>
            ))}
          </div>

          {/* Benefits + Card skeleton */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
            {/* Benefits skeleton */}
            <div className="space-y-4">
              <div className="h-3 w-48 bg-site-accent/20 rounded-md animate-pulse mb-2" />
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-site-primary/5 animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-site-primary/10 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-site-primary/10 rounded-md" />
                    <div className="h-3 w-full bg-site-primary/5 rounded-md" />
                  </div>
                </div>
              ))}
            </div>

            {/* Card skeleton */}
            <div className="relative max-w-sm mx-auto lg:mx-0 w-full">
              <div className="bg-white rounded-2xl shadow-lg p-5 min-h-[370px] animate-pulse">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-site-accent/20 via-amber-400/20 to-site-secondary/20" />
                <div className="flex items-center justify-between mb-4 pt-1">
                  <div className="space-y-1.5">
                    <div className="h-4 w-24 bg-site-primary/10 rounded-md" />
                    <div className="h-3 w-32 bg-site-primary/5 rounded-md" />
                  </div>
                  <div className="h-5 w-16 bg-site-primary/5 rounded-full" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="h-4 w-full bg-site-primary/5 rounded-md" />
                  <div className="h-12 w-full bg-site-primary/5 rounded-lg" />
                  <div className="h-12 w-full bg-site-primary/5 rounded-lg" />
                  <div className="h-12 w-full bg-site-primary/5 rounded-lg" />
                  <div className="h-12 w-full bg-site-primary/5 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loading;