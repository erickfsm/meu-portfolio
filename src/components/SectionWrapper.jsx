export default function SectionWrapper({ 
  id, 
  title, 
  children, 
  className = "" 
}) {
  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 px-6 max-w-6xl mx-auto ${className}`}
    >
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
