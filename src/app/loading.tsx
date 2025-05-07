const Loading = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Shimmer background bubbles */}
      <div className="absolute inset-0 z-0 opacity-10 animate-pulse">
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-blue-300" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-blue-100" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-blue-100" />
      </div>

      {/* Header */}

      <header className="relative  z-10 py-6 px-6 flex items-center justify-center w-full  border-b border-gray-100">
        <div className="max-w-6xl w-full flex items-center justify-between">
          <div className="h-8 w-32 bg-blue-200 rounded-lg animate-pulse" />
          <div className="flex gap-4">
            <div className="h-8 w-20 bg-blue-100 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Hero Content */}
      <section className="relative z-10 py-20 px-6 text-center">
        <div className="space-y-6 max-w-md mx-auto">
          <div className="h-6 w-40 bg-blue-200 rounded-full mx-auto animate-pulse" />
          <div className="h-10 w-64 bg-blue-300 rounded-lg mx-auto animate-pulse" />
          <div className="h-5 w-72 bg-blue-100 rounded-md mx-auto animate-pulse" />
          <div className="h-5 w-60 bg-blue-100 rounded-md mx-auto animate-pulse" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <div className="h-10 w-48 bg-blue-300 rounded-full animate-pulse" />
            <div className="h-10 w-48 bg-white border border-blue-200 rounded-full animate-pulse" />
          </div>

          <div className="h-6 w-64 bg-blue-50 border border-blue-100 rounded-lg mx-auto mt-8 animate-pulse" />
        </div>
      </section>
    </div>
  );
};

export default Loading;
