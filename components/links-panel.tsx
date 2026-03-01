"use client";

const links = [
  {
    category: "Build",
    items: [
      { label: "v0.dev", url: "https://v0.dev", desc: "Start building here" },
      {
        label: "v0 Docs",
        url: "https://v0.dev/docs",
        desc: "Getting started guide",
      },
    ],
  },
  {
    category: "Learn",
    items: [
      {
        label: "Prompt Engineering Tips",
        url: "https://v0.dev/docs",
        desc: "Write better prompts",
      },
      {
        label: "Next.js Docs",
        url: "https://nextjs.org/docs",
        desc: "Framework reference",
      },
      {
        label: "Vercel AI SDK",
        url: "https://sdk.vercel.ai",
        desc: "Build AI features",
      },
    ],
  },
  {
    category: "Community",
    items: [
      {
        label: "MakersLounge",
        url: "https://makerslounge.to",
        desc: "Join the community",
      },
    ],
  },
];

export function LinksPanel({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      {visible && (
        <div
          className="fixed inset-0 z-40 bg-foreground/5"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-80 flex-col border-l border-border bg-card shadow-lg transition-transform duration-300 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
        role="complementary"
        aria-label="Resources and links"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Resources
          </h2>
          <button
            onClick={onToggle}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close resources panel"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M6 6l8 8M14 6l-8 8" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-8">
            {links.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.category}
                </h3>
                <div className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-lg border border-border px-4 py-3 transition-colors hover:border-accent/30 hover:bg-accent/5"
                    >
                      <span className="text-sm font-medium text-card-foreground group-hover:text-accent">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.desc}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-border px-6 py-3">
          <p className="text-center text-xs text-muted-foreground">
            Press <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-xs">L</kbd> to toggle
          </p>
        </div>
      </div>
    </>
  );
}
