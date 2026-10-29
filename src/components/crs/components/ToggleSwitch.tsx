interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
  disabled?: boolean;
}

export default function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex shrink-0 cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.checked)}
      />

      <div
        className="
          relative
          h-6 w-11
          rounded-full
          bg-[#c5cad4]
          transition-colors

          after:absolute
          after:left-2px
          after:top-1/2
          after:h-5
          after:w-5
          after:-translate-y-1/2
          after:rounded-full
          after:bg-white
          after:shadow-sm
          after:transition-transform
          after:content-['']

          peer-checked:bg-[#0566c7]
          peer-checked:after:translate-x-full

          peer-focus-visible:ring-2
          peer-focus-visible:ring-[#0566c7]/30

          peer-disabled:cursor-not-allowed
          peer-disabled:opacity-50
        "
      />
    </label>
  );
}
