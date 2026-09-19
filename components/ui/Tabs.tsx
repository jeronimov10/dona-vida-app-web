import { cn } from "@/lib/cn";

export interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
  className?: string;
}

/** Tabs (primary tabs): pestañas de texto subrayado, cambian una vista interna. */
export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div role="tablist" className={cn("flex gap-8 border-b border-soft", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={tab === active}
          onClick={() => onChange(tab)}
          className={cn(
            "-mb-px border-b-2 pb-3 text-body",
            tab === active
              ? "border-primary text-primary"
              : "border-transparent text-ink-muted hover:text-primary",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
