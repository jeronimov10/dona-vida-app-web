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
    <div className={cn("flex gap-8 border-b border-gray-20", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={cn(
            "-mb-px border-b-2 pb-3 text-body",
            tab === active
              ? "border-gray-black text-gray-black"
              : "border-transparent text-gray-60 hover:text-gray-black",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
