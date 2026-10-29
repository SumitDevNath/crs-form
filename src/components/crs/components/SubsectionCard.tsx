import type { ReactNode } from "react";

interface SubsectionCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function SubsectionCard({
  title,
  children,
  className = "",
}: SubsectionCardProps) {
  return (
    <section
      className={`rounded-lg border border-[#cfd6df] bg-white p-5 ${className}`}
    >
      {title && (
        <div className="mb-4 border-b border-[#d9dee5] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#1f2937]">
            {title}
          </h3>
        </div>
      )}

      {children}
    </section>
  );
}
