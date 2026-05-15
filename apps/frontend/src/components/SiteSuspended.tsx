export function SiteSuspended() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#0a1628] px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-900/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,95,0.4)_0%,_transparent_70%)]" />
      </div>

      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
          <svg
            className="h-7 w-7 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Website Temporarily Suspended
        </h1>

        <p className="mb-8 text-base leading-relaxed text-slate-300 sm:text-lg">
          This website is currently unavailable due to pending account settlement.
          Please contact the service provider to restore access.
        </p>

        <div
          className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
          aria-hidden
        />

        <p className="mt-8 text-sm font-medium tracking-wide text-slate-400">
          Service Provider
        </p>
        <p className="mt-1 text-base font-semibold text-amber-400/90">
          Shahil AppDev
        </p>
      </div>
    </div>
  )
}
