interface Props {
  src: string;
  overlay?: "dark" | "blue" | "fade";
  className?: string;
}

export function VideoBackground({ src, overlay = "blue", className = "" }: Props) {
  const overlayClass =
    overlay === "dark"
      ? "bg-slate-950/70 backdrop-blur-sm"
      : overlay === "fade"
        ? "bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950"
        : "backdrop-blur-md bg-slate-950/55";
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.6)_75%,#030712_100%)]" />
    </div>
  );
}
