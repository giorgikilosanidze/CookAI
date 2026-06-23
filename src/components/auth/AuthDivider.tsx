export default function AuthDivider() {
  return (
    <div className="my-[22px] flex items-center gap-3.5">
      <div className="h-px flex-1 bg-line" />
      <span className="text-[13px] font-semibold tracking-[0.04em] text-faint">
        or
      </span>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}
