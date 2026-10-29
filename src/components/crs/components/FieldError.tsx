interface FieldErrorProps {
  message?: string;
}

export default function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="pt-1">
      <p className="text-xs leading-4 text-[#d32f2f]">{message}</p>
    </div>
  );
}
