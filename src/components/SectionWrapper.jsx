function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export default function SectionWrapper({
  as: Component = "section",
  id,
  className = "",
  surfaceClassName = "",
  contentClassName = "",
  disableSurface = false,
  children,
  ...rest
}) {
  const shellClasses = classNames("section-shell", className);

  if (disableSurface) {
    return (
      <Component id={id} className={shellClasses} {...rest}>
        <div className={classNames("relative", contentClassName)}>{children}</div>
      </Component>
    );
  }

  const surfaceClasses = classNames(
    "relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1224]/70 p-8 md:p-12 shadow-[0_45px_120px_rgba(5,10,30,0.45)] backdrop-blur-xl",
    surfaceClassName
  );

  return (
    <Component id={id} className={shellClasses} {...rest}>
      <div className={surfaceClasses}>
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute -top-36 left-12 h-72 w-72 rounded-full bg-[#6c3cff2b] blur-[120px]" />
          <span className="absolute -bottom-40 right-12 h-80 w-80 rounded-full bg-[#00c9a724] blur-[140px]" />
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(108,60,255,0.12),transparent_60%)] opacity-80" />
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,201,167,0.12),transparent_60%)]" />
        </div>
        <div className={classNames("relative z-10", contentClassName)}>{children}</div>
      </div>
    </Component>
  );
}

