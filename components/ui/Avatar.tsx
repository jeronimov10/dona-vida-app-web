import { cn } from "@/lib/cn";

/** Avatar: círculo gris liso. */
export function Avatar({
  size = 48,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-block shrink-0 rounded-full bg-soft", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
