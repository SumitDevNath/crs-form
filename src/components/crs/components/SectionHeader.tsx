import type { ReactNode } from "react";

interface SectionHeaderProps {
  image: string;
  title: string;
  subtitle?: string;
  mandatory?: boolean;
  rightContent?: ReactNode;
}

export default function SectionHeader({
  image,
  title,
  subtitle,
  mandatory = false,
  rightContent,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 bg-white px-0 pt-0 pb-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="h-6 w-6 object-contain"
          />
        </div>

        <div>
          <h2 className="text-[18px] font-bold text-[#0f172a]">{title}</h2>

          {subtitle && (
            <p className="mt-1 text-sm text-[#566575]">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {mandatory && (
          <div className="rounded-full bg-[#fdecec] px-4 py-2 text-xs font-medium text-[#c62828]">
            * Mandatory field
          </div>
        )}

        {rightContent}
      </div>
    </div>
  );
}
